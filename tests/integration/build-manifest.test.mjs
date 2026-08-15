// @vitest-environment node
// Integration test for the cross-browser manifest generator (scripts/build-manifest.mjs).
// Asserts: Chrome == reference, Edge == Chromium reuse, Firefox adds gecko id and keeps
// the MV3 background shape, and every target's version matches package.json.
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  generate,
  buildManifestFor,
  readReferenceManifest,
  readPackageVersion,
  TARGETS,
} from "../../scripts/build-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("build-manifest cross-browser generation", () => {
  let tmpDir;
  let outDir;
  let manifests;

  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tweaksync-build-"));
    outDir = path.join(tmpDir, "dist");
    manifests = generate(["chrome", "edge", "firefox"], outDir);
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("generates manifests for every supported target", () => {
    expect(Object.keys(manifests).sort()).toEqual([...TARGETS].sort());
  });

  it("Chrome manifest is the reference (unchanged shape)", () => {
    const reference = readReferenceManifest();
    expect(manifests.chrome.manifest_version).toBe(3);
    expect(manifests.chrome).toMatchObject(reference);
  });

  it("Edge reuses the Chromium (Chrome) manifest", () => {
    expect(manifests.edge).toEqual(manifests.chrome);
  });

  it("Firefox adds browser_specific_settings.gecko", () => {
    expect(manifests.firefox.browser_specific_settings).toBeDefined();
    expect(manifests.firefox.browser_specific_settings.gecko).toBeDefined();
    expect(typeof manifests.firefox.browser_specific_settings.gecko.id).toBe("string");
    expect(manifests.firefox.browser_specific_settings.gecko.id.length).toBeGreaterThan(0);
  });

  it("Firefox preserves the MV3 background shape", () => {
    expect(manifests.firefox.manifest_version).toBe(3);
    expect(manifests.firefox.background).toEqual(manifests.chrome.background);
  });

  it("version matches package.json for all targets", () => {
    const version = readPackageVersion();
    for (const target of TARGETS) {
      expect(manifests[target].version).toBe(version);
    }
  });

  it("writes a loadable manifest.json to disk for each target", () => {
    for (const target of TARGETS) {
      const file = path.join(outDir, target, "manifest.json");
      expect(fs.existsSync(file)).toBe(true);
      const parsed = JSON.parse(fs.readFileSync(file, "utf-8"));
      expect(parsed.version).toBe(manifests[target].version);
      expect(parsed.manifest_version).toBe(3);
    }
  });

  it("buildManifestFor injects package version and adds gecko only for firefox", () => {
    const reference = readReferenceManifest();
    const version = readPackageVersion();
    const chrome = buildManifestFor("chrome", { version, reference });
    const firefox = buildManifestFor("firefox", { version, reference });
    expect(chrome.version).toBe(version);
    expect(chrome.browser_specific_settings).toBeUndefined();
    expect(firefox.browser_specific_settings.gecko).toBeDefined();
  });
});
