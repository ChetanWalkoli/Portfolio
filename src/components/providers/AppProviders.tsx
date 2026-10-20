"use client";

import { MotionProvider } from "@/context/MotionContext";
import { SmoothScroll } from "./SmoothScroll";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </MotionProvider>
  );
}
