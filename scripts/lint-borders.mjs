import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SRC_ROOT = "src";
const ALLOWED_PREFIXES = ["src/adapters", "src/extension"];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, files);
    } else if (/\.(ts|tsx)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

function isAllowed(relPath) {
  return ALLOWED_PREFIXES.some(
    (prefix) => relPath === prefix || relPath.startsWith(prefix + "/")
  );
}

const violations = [];
const files = walk(SRC_ROOT);

for (const file of files) {
  const rel = relative(process.cwd(), file).replace(/\\/g, "/");
  if (isAllowed(rel)) {
    continue;
  }
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    if (/\bchrome\./.test(line) || /\bbrowser\./.test(line)) {
      violations.push(`${rel}:${index + 1}: ${line.trim()}`);
    }
  });
}

if (violations.length > 0) {
  console.error(
    "Border lint FAILED: chrome./browser. usage outside src/adapters or src/extension:"
  );
  for (const v of violations) {
    console.error(`  ${v}`);
  }
  process.exit(1);
}

console.log(
  "Border lint passed: no chrome./browser. references outside src/adapters or src/extension."
);
