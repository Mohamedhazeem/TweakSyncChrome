import { useState } from "react";
import { createBrowserPort } from "@/adapters/browser";
import type { BrowserPort } from "@/ports/BrowserPort";

/** Provides the single extension `BrowserPort` instance to React components. */
export function useBrowser(): BrowserPort {
  const [port] = useState<BrowserPort>(() => createBrowserPort());
  return port;
}
