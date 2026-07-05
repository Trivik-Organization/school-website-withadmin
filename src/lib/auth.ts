import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-super-secret-key-at-least-32-chars-long";
const SESSION_COOKIE_NAME = "school_admin_session";

// Base64URL encoding helpers using Web APIs (Middleware & Edge safe)
function bufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
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

// Generate JWT token (Middleware & Edge safe)
export async function signJWT(payload: any, expiresInSeconds = 86400): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };

  const encoder = new TextEncoder();
  const encodedHeader = bufferToBase64Url(encoder.encode(JSON.stringify(header)));
  const encodedPayload = bufferToBase64Url(encoder.encode(JSON.stringify(fullPayload)));

  const signingKey = await getSigningKey(JWT_SECRET);
  const dataToSign = encoder.encode(`${encodedHeader}.${encodedPayload}`);
  const signatureBuffer = await crypto.subtle.sign("HMAC", signingKey, dataToSign);
  const encodedSignature = bufferToBase64Url(signatureBuffer);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

// Verify JWT token (Middleware & Edge safe)
export async function verifyJWT(token: string): Promise<any | null> {
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

// Password hashing wrappers using bcrypt (Run in Node context)
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Session cookie helper (Server actions & API routes safe)
export async function setSessionCookie(payload: { userId: number; username: string; role: string }) {
  const token = await signJWT(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionUser(): Promise<{ userId: number; username: string; role: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return null;

  return verifyJWT(sessionCookie.value);
}
