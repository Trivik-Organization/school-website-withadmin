import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "school_admin_session";
const JWT_SECRET = process.env.JWT_SECRET || "fallback-super-secret-key-at-least-32-chars-long";

// Inline lightweight JWT verify helper for Proxy (fully edge runtime compatible)
async function getSigningKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function base64UrlToBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function verifyJWT(token: string): Promise<any | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const signingKey = await getSigningKey(JWT_SECRET);

    const encoder = new TextEncoder();
    const dataToVerify = encoder.encode(`${encodedHeader}.${encodedPayload}`);
    const signatureBuffer = base64UrlToBuffer(encodedSignature);

    const isValid = await crypto.subtle.verify("HMAC", signingKey, signatureBuffer, dataToVerify);
    if (!isValid) return null;

    const decoder = new TextDecoder();
    const payloadJson = decoder.decode(base64UrlToBuffer(encodedPayload));
    const payload = JSON.parse(payloadJson);

    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // 1. API Route Protection
  if (pathname.startsWith("/api/")) {
    // GET requests are generally public (reading notices, events, blogs, etc.)
    if (method === "GET") {
      // Exception: GET /api/inquiries is admin-only (reading contact messages)
      if (pathname === "/api/inquiries") {
        const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
        const payload = sessionToken ? await verifyJWT(sessionToken) : null;
        if (!payload) {
          return new NextResponse(
            JSON.stringify({ error: "Unauthorized. Admin session required." }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          );
        }
      }
      return NextResponse.next();
    }

    // Write requests (POST, PUT, DELETE, PATCH)
    // Exceptions that don't need auth:
    const isAuthRoute = pathname.startsWith("/api/auth/");
    const isInquirySubmission = pathname === "/api/inquiries" && method === "POST";

    if (isAuthRoute || isInquirySubmission) {
      return NextResponse.next();
    }

    // All other write requests require admin auth
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const payload = sessionToken ? await verifyJWT(sessionToken) : null;

    if (!payload) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized. Admin session required." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.next();
  }

  // 2. Page Route Protection (for potential admin frontend routes)
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      // If already logged in, redirect to dashboard
      const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
      const payload = sessionToken ? await verifyJWT(sessionToken) : null;
      if (payload) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    // Protected pages (dashboard, gallery manager, notice manager, etc.)
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const payload = sessionToken ? await verifyJWT(sessionToken) : null;

    if (!payload) {
      // Redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
