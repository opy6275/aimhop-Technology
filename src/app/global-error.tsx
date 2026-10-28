"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  retry,
  reset,
}: {
  error: unknown;
  retry?: () => void;
  reset?: () => void;
}) {
  const currentYear = 2026;

  useEffect(() => {
    console.error("Global Root Layout Error:", error);
  }, [error]);

  const handleRetry = () => {
    if (typeof retry === "function") {
      retry();
    } else if (typeof reset === "function") {
      reset();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "24px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FAF7F2",
          color: "#261C19",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "480px",
            margin: "0 auto",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              backgroundColor: "#6B1D2F",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 25px -5px rgba(107, 29, 47, 0.3)",
            }}
          >
            <AlertTriangle style={{ width: "32px", height: "32px", color: "#C8963E" }} />
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "#261C19",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            System Interruption
          </h1>

          <p
            style={{
              fontSize: "14px",
              color: "#5E504B",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            A critical system error occurred. Our engineering monitors have logged this incident. Please click below to reload the application.
          </p>

          <button
            type="button"
            onClick={handleRetry}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              backgroundColor: "#6B1D2F",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(107, 29, 47, 0.25)",
            }}
          >
            <RotateCcw style={{ width: "16px", height: "16px", color: "#C8963E" }} />
            <span>Reload Application</span>
          </button>
        </div>

        <footer style={{ padding: "16px 0", fontSize: "12px", color: "#5E504B" }}>
          &copy; {currentYear} AIMHOP Tech Solutions. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
