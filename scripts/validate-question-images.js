#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const dataDirectory = path.join(projectRoot, "data");
const sourceFiles = [
  path.join(projectRoot, "app.js"),
  ...fs
    .readdirSync(dataDirectory)
    .filter((file) => file.endsWith(".js"))
    .map((file) => path.join(dataDirectory, file)),
];

const imageFieldPattern = /["']?(?:frontImage|backImage)["']?\s*:\s*["']([^"']+)["']/g;
const references = new Set();

for (const sourceFile of sourceFiles) {
  const content = fs.readFileSync(sourceFile, "utf8");
  for (const match of content.matchAll(imageFieldPattern)) {
    references.add(match[1]);
  }
}

function validatePng(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== signature) {
    return "invalid PNG signature";
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return width > 0 && height > 0 ? `${width}x${height}` : "invalid PNG dimensions";
}

function validateImage(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);

  if (!buffer.length) return "empty file";
  if (extension === ".png") return validatePng(buffer);
  if (extension === ".jpg" || extension === ".jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer.at(-2) === 0xff && buffer.at(-1) === 0xd9
      ? "valid JPEG"
      : "invalid JPEG markers";
  }
  if (extension === ".webp") {
    return buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP"
      ? "valid WebP"
      : "invalid WebP signature";
  }
  if (extension === ".svg") {
    return buffer.toString("utf8").includes("<svg") ? "valid SVG markup" : "invalid SVG markup";
  }
  return `unsupported image extension: ${extension || "none"}`;
}

const failures = [];

for (const reference of [...references].sort()) {
  const filePath = path.resolve(projectRoot, reference);
  if (!filePath.startsWith(`${projectRoot}${path.sep}`)) {
    failures.push(`${reference}: path escapes project root`);
    continue;
  }
  if (!fs.existsSync(filePath)) {
    failures.push(`${reference}: missing`);
    continue;
  }

  const result = validateImage(filePath);
  if (result.startsWith("invalid") || result.startsWith("empty") || result.startsWith("unsupported")) {
    failures.push(`${reference}: ${result}`);
  } else {
    console.log(`OK ${reference} (${result})`);
  }
}

if (failures.length) {
  console.error(`\n${failures.length} image validation failure(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`\nValidated ${references.size} referenced question image(s).`);
