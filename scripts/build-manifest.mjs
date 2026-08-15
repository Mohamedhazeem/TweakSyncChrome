#!/usr/bin/env node
// Generates per-browser extension manifests from the single Chrome MV3 reference
// (public/manifest.json). Chrome/Edge are Chromium (Edge reuses Chrome); Firefox
// adds browser_specific_settings.gecko. The manifest `version` is always injected
// from package.json so all targets stay in lockstep with the published version.
//
// Usage: node scripts/build-manifest.mjs [chrome|edge|firefox|all] [--outDir <dir>]
// Also importable for tests: generate(targets, outDir).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_MANIFEST = path.join(ROOT, "public", "manifest.json");
const PACKAGE_JSON = path.join(ROOT, "package.json");

// Firefox add-on id. Override via GECKO_ID env when publishing to AMO.
const GECKO_ID = process.env.GECKO_ID || "tweaksync@example.org";

export const TARGETS = ["chrome", "edge", "firefox"];

export function readReferenceManifest() {
  return JSON.parse(fs.readFileSync(PUBLIC_MANIFEST, "utf-8"));
}

export function readPackageVersion() {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, "utf-8"));
  return pkg.version;
}

export function buildManifestFor(target, { version, reference }) {
  const manifest = structuredClone(reference);
  manifest.version = version;

  if (target === "firefox") {
    manifest.browser_specific_settings = {
      ...(manifest.browser_specific_settings || {}),
      gecko: { id: GECKO_ID },
    };
  }

  return manifest;
}

export function generate(targets = TARGETS, outDir = path.join(ROOT, "dist")) {
  const reference = readReferenceManifest();
  const version = readPackageVersion();
  const results = {};

  for (const target of targets) {
    if (!TARGETS.includes(target)) {
      throw new Error(`Unknown build target: ${target} (expected one of ${TARGETS.join(", ")})`);
    }
    const manifest = buildManifestFor(target, { version, reference });
    const dir = path.join(outDir, target);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "manifest.json"),
      JSON.stringify(manifest, null, 2) + "\n",
      "utf-8"
    );
    results[target] = manifest;
  }

  return results;
}

export function main(argv = process.argv.slice(2)) {
  let targets = argv.filter((arg) => TARGETS.includes(arg));
  if (argv.includes("all") || targets.length === 0) {
    targets = TARGETS;
  }
  const outDirIndex = argv.indexOf("--outDir");
  const outDir =
    outDirIndex !== -1 && argv[outDirIndex + 1]
      ? path.resolve(argv[outDirIndex + 1])
      : path.join(ROOT, "dist");

  const results = generate(targets, outDir);
  for (const target of Object.keys(results)) {
    console.log(`Generated ${path.join(outDir, target, "manifest.json")}`);
  }
  return results;
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  main();
}
