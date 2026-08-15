import { useEffect, useRef, useState } from "react";
import type { ConnectionState, SyncTransportPort } from "@/ports/SyncTransportPort";
import { SyncService } from "@/core/sync/SyncService";

/**
 * Owns a `SyncService` for the component tree. The transport is injected so the
 * same hook drives the real adapter in the extension and the in-memory port in
 * tests.
 */
export function useSync(transport: SyncTransportPort) {
  const serviceRef = useRef<SyncService | undefined>(undefined);
  if (!serviceRef.current) {
    serviceRef.current = new SyncService(transport);
  }

  const [state, setState] = useState<ConnectionState>(serviceRef.current.getState());

  useEffect(() => {
    const unsubscribe = serviceRef.current!.onState(setState);
    return () => {
      unsubscribe();
    };
  }, []);

  const connect = () => serviceRef.current!.connect();
  const disconnect = () => serviceRef.current!.disconnect();
  const sendStyleEdit = (input: Parameters<SyncService["sendStyleEdit"]>[0]) =>
    serviceRef.current!.sendStyleEdit(input);

  return { state, connect, disconnect, sendStyleEdit };
}
