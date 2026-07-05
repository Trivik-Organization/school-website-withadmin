"use client";

import Script from "next/script";

export default function ApiDocs() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css"
        crossOrigin="anonymous"
      />
      <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "10px" }}>
        <div id="swagger-ui">Loading API Documentation...</div>
      </div>
      <Script
        src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"
        crossOrigin="anonymous"
        onLoad={() => {
          const win = window as any;
          if (win.SwaggerUIBundle) {
            win.SwaggerUIBundle({
              url: "/api/docs",
              dom_id: "#swagger-ui",
              deepLinking: true,
              presets: [
                win.SwaggerUIBundle.presets.apis,
                win.SwaggerUIBundle.SwaggerUIStandalonePreset,
              ],
              layout: "BaseLayout",
            });
          }
        }}
      />
    </>
  );
}
