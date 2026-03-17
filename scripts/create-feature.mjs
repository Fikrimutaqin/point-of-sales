import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";

function toKebab(input) {
  return String(input)
    .trim()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function toPascal(input) {
  return String(input)
    .trim()
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}

async function ensureDir(p) {
  await fsp.mkdir(p, { recursive: true });
}

async function writeFileIfNotExists(filePath, content) {
  try {
    await fsp.access(filePath, fs.constants.F_OK);
  } catch {
    await ensureDir(path.dirname(filePath));
    await fsp.writeFile(filePath, content, "utf8");
  }
}

async function promptFeatureName() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (q) => new Promise((res) => rl.question(q, res));
  const ans = await question("Feature name: ");
  rl.close();
  return ans;
}

async function main() {
  let rawName = process.argv[2];
  if (!rawName) rawName = await promptFeatureName();
  if (!rawName || !rawName.trim()) {
    console.error("Feature name is required");
    process.exit(1);
  }

  const normalized = String(rawName).trim().replace(/[:\s]+/g, "/").replace(/\/+/g, "/");
  const parts = normalized.split("/").filter(Boolean);
  const groupRaw = parts[0];
  const groupSlug = toKebab(groupRaw);
  const groupPascal = toPascal(groupRaw);

  const cwd = process.cwd();
  const featureRoot = path.join(cwd, "features", groupSlug);

  await ensureDir(path.join(featureRoot, "components"));
  await ensureDir(path.join(featureRoot, "hooks"));
  await ensureDir(path.join(featureRoot, "services", "usecases"));
  await ensureDir(path.join(featureRoot, "types"));
  await ensureDir(path.join(featureRoot, "utils"));

  const componentFile = path.join(featureRoot, "components", `${groupPascal}Section.tsx`);
  const componentContent =
    `export default function ${groupPascal}Section() {\n` +
    `  return (\n` +
    `    <div className="rounded-lg border p-4">\n` +
    `      <div className="text-base font-semibold">${groupPascal}</div>\n` +
    `      <p className="text-sm text-gray-600">This is the ${groupSlug} feature.</p>\n` +
    `    </div>\n` +
    `  );\n` +
    `}\n`;

  const barrelFiles = [
    path.join(featureRoot, "components", "index.ts"),
    path.join(featureRoot, "hooks", "index.ts"),
    path.join(featureRoot, "services", "usecases", "index.ts"),
    path.join(featureRoot, "types", "index.ts"),
    path.join(featureRoot, "utils", "index.ts"),
    path.join(featureRoot, "index.ts"),
  ];

  await writeFileIfNotExists(componentFile, componentContent);
  for (const bf of barrelFiles) {
    await writeFileIfNotExists(bf, "");
  }

  console.log(`Created feature "${groupSlug}".`);
  console.log(`- features/${groupSlug}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

