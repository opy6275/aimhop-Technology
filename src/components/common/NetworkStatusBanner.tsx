"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";

export const NetworkStatusBanner: React.FC = () => {
  // Always initialize to false for deterministic SSR, then sync on mount to eliminate hydration mismatch
  const [isOffline, setIsOffline] = useState(false);
  const [isReconnected, setIsReconnected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Check actual online status on client after hydration
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setIsOffline(true);
    }

    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const handleOffline = () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      setIsOffline(true);
      setIsReconnected(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setIsReconnected(true);

      // Auto-hide the "Back Online" banner after 3.5 seconds
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(() => {
        setIsReconnected(false);
      }, 3500);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const handleManualCheck = () => {
    setIsChecking(true);
    // Quick latency / ping probe
    fetch("/favicon.ico", { method: "HEAD", cache: "no-store" })
      .then(() => {
        setIsOffline(false);
        setIsReconnected(true);
        setTimeout(() => setIsReconnected(false), 3500);
      })
      .catch(() => {
        setIsOffline(true);
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  // If user is online and no recent reconnection message, don't render anything
  if (!isOffline && !isReconnected) return null;

  return (
    <aside
      aria-live="assertive"
      aria-label="Network Connection Status"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[99999] w-[92%] max-w-md animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-auto select-none"
    >
      {isOffline ? (
        // OFFLINE BANNER: Wine Red & Crimson Alert Pill
        <div className="flex items-center justify-between gap-3 p-3.5 sm:px-4 rounded-2xl bg-[#200408] text-white border border-[#8B1E3F]/80 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
              <WifiOff className="w-4 h-4 text-rose-400 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold font-heading text-rose-200">
                You&apos;re Currently Offline
              </div>
              <div className="text-[11px] text-rose-100/75">
                Check your internet connection.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleManualCheck}
            disabled={isChecking}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider font-mono transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isChecking ? "animate-spin" : ""}`} />
            <span>{isChecking ? "Checking..." : "Retry"}</span>
          </button>
        </div>
      ) : (
        // BACK ONLINE BANNER: Emerald Success Pill
        <div className="flex items-center gap-3 p-3.5 sm:px-4 rounded-2xl bg-[#062414] text-white border border-emerald-500/80 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Wifi className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-bold font-heading text-emerald-200">
              Connection Restored!
            </div>
            <div className="text-[11px] text-emerald-100/75">
              You are back online and connected.
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
