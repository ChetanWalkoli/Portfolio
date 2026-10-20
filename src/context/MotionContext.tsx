"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "chetan-motion";

type MotionContextValue = {
  motionEnabled: boolean;
  ready: boolean;
  setMotionEnabled: (value: boolean) => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

function readPreference(): boolean {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "on") return true;
  if (stored === "off") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [motionEnabled, setMotionEnabledState] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enabled = readPreference();
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    const rafId = window.requestAnimationFrame(() => {
      setMotionEnabledState(enabled);
      setReady(true);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const setMotionEnabled = (value: boolean) => {
    setMotionEnabledState(value);
    document.documentElement.dataset.motion = value ? "on" : "off";
    window.localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  };

  const value = useMemo(
    () => ({ motionEnabled, ready, setMotionEnabled }),
    [motionEnabled, ready],
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotionPreference() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotionPreference must be used within MotionProvider");
  }
  return ctx;
}
