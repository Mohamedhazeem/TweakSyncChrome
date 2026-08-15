import { useEffect, useState } from "react";
import type { BrowserPort } from "@/ports/BrowserPort";
import type { Message, MessagingPort } from "@/ports/MessagingPort";

/**
 * Subscribes a component to inbound extension messages for the lifetime of the
 * hook. The handler is kept in a ref so re-subscription only happens when the
 * port changes.
 */
export function useMessaging(
  port: BrowserPort | MessagingPort,
  handler: (message: Message, reply?: (response: unknown) => void) => void
): void {
  const messaging = "messaging" in port ? port.messaging : (port as MessagingPort);

  useEffect(() => {
    const unsubscribe = messaging.onMessage(handler);
    return () => {
      unsubscribe();
    };
  }, [messaging, handler]);
}

/** Sends a message through the supplied port. */
export function useMessageSender(
  port: BrowserPort | MessagingPort
): (message: Message) => Promise<unknown> {
  const messaging = "messaging" in port ? port.messaging : (port as MessagingPort);
  return (message: Message) => messaging.send(message);
}

export function useManifest(port: BrowserPort): string {
  const [version, setVersion] = useState("");
  useEffect(() => {
    try {
      setVersion(port.runtime.getManifest().version);
    } catch {
      setVersion("");
    }
  }, [port]);
  return version;
}
