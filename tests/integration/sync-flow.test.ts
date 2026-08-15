import { beforeEach, describe, expect, it } from "vitest";
import { MemorySyncTransportPort } from "@/adapters/memory/MemorySyncTransportPort";
import { SyncService } from "@/core/sync/SyncService";
import {
  collectSelectorDeclarations,
  serializeDeclarations,
} from "@/core/sync/serializeStyles";
import { setStyleValue } from "@/core/styling/elementStyleState";
import { createEmptyElementStyles } from "@/core/styling/styleState";
import type { ConnectionState } from "@/ports/SyncTransportPort";

let transport: MemorySyncTransportPort;
let service: SyncService;

beforeEach(() => {
  transport = new MemorySyncTransportPort();
  service = new SyncService(transport, { languageId: "css" });
});

describe("style edit -> sync flow", () => {
  it("serialises a selector bucket and ships it over the transport", async () => {
    await service.connect();

    let styles = createEmptyElementStyles();
    styles.external.classes[".card"] = { color: "red" };
    styles.temporaryId = "a1";

    styles = setStyleValue(styles, ".card", "color", "blue");
    styles = setStyleValue(styles, ".card", "display", "flex");

    await service.sendStyleEdit({ elementId: styles.temporaryId!, styles, selector: ".card" });

    expect(transport.getSentMessages()).toEqual([
      {
        languageId: "css",
        elementId: "a1",
        serialized: "color: blue; display: flex;",
      },
    ]);
  });

  it("collects declarations from any selector bucket", () => {
    const styles = createEmptyElementStyles();
    styles.inline.opacity = "0.5";
    styles.external.ids["#hero"] = { display: "flex" };

    expect(collectSelectorDeclarations(styles, "inline")).toEqual({ opacity: "0.5" });
    expect(collectSelectorDeclarations(styles, "#hero")).toEqual({ display: "flex" });
    expect(collectSelectorDeclarations(styles, ".unknown")).toEqual({});
  });

  it("skips empty declaration values when serialising", () => {
    expect(serializeDeclarations({ color: "red", display: "" })).toBe("color: red;");
    expect(serializeDeclarations({})).toBe("");
  });

  it("tracks the connection lifecycle through the port", async () => {
    const states: ConnectionState[] = [];
    service.onState((state) => states.push(state));

    await service.connect();
    expect(service.getState()).toBe("connected");

    service.disconnect();
    expect(service.getState()).toBe("idle");
    expect(states).toEqual(["idle", "connected", "idle"]);
  });

  it("relays transport messages to subscribers and unsubscribes cleanly", async () => {
    const received: unknown[] = [];
    const unsubscribe = service.onMessage((message) => received.push(message));

    await service.connect();
    transport.emitMessage({ type: "appliedStyleSucessfully" });
    expect(received).toEqual([{ type: "appliedStyleSucessfully" }]);

    unsubscribe();
    transport.emitMessage({ type: "appliedStyleSucessfully" });
    expect(received).toHaveLength(1);
  });

  it("refuses to send an edit with no element id", async () => {
    await service.connect();
    const styles = createEmptyElementStyles();

    await expect(
      service.sendStyleEdit({ elementId: "", styles, selector: ".card" })
    ).rejects.toThrow(/element id/i);
    expect(transport.getSentMessages()).toHaveLength(0);
  });
});
