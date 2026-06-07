// Image sorter — sorts images by average HSV values.
//
// Usage: node scripts/image_color_sort.js <source-dir>
//   source-dir : path to a folder containing the images to sort
//
// Output: copies images into src/images/image-board/ with incremental
// numeric names (1.jpg, 2.png, …) ordered by hue, then saturation,
// then value.

import { readdir, readFile, copyFile, mkdir } from "node:fs/promises";
import { extname, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGE_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".tiff", ".gif",
]);

/** Compute the average RGB colour of a buffer and return its HSV. */
async function averageHSV(buffer) {
  const { data, info } = await sharp(buffer)
    .resize(64, 64, { fit: "inside" })   // small for speed
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = info.width * info.height;
  let r = 0, g = 0, b = 0;

  for (let i = 0; i < data.length; i += info.channels) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r = Math.round(r / pixels);
  g = Math.round(g / pixels);
  b = Math.round(b / pixels);

  return rgbToHSV(r, g, b);
}

/** Convert a single RGB pixel (0-255) to HSV. */
function rgbToHSV(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r)      h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / delta + 2) * 60;
    else                h = ((r - g) / delta + 4) * 60;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return { h, s, v };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const srcDir = process.argv[2];
if (!srcDir) {
  console.error("Usage: node scripts/image_color_sort.js <source-dir>");
  process.exit(1);
}

const source = resolve(srcDir);
const dest = resolve(__dirname, "..", "src", "images", "image-board");

// Ensure the destination folder exists
await mkdir(dest, { recursive: true });

// Discover image files in the source directory
const entries = await readdir(source, { withFileTypes: true });
const imageFiles = entries
  .filter((e) => e.isFile() && IMAGE_EXTENSIONS.has(extname(e.name).toLowerCase()))
  .map((e) => resolve(source, e.name));

if (imageFiles.length === 0) {
  console.error(`No image files found in ${source}`);
  process.exit(1);
}

console.log(`Found ${imageFiles.length} image(s) in ${source}`);
console.log("Computing average colours …");

// Compute HSV for every image
const scored = [];
for (const filePath of imageFiles) {
  const buffer = await readFile(filePath);
  const hsv = await averageHSV(buffer);
  scored.push({ filePath, hsv, ext: extname(filePath) });
}

// Sort: hue first, then saturation (high to low), then value (high to low)
scored.sort((a, b) => {
  if (a.hsv.h !== b.hsv.h) return a.hsv.h - b.hsv.h;
  if (a.hsv.s !== b.hsv.s) return b.hsv.s - a.hsv.s;
  return b.hsv.v - a.hsv.v;
});

// Copy with incremental names, preserving original extension
console.log("Copying sorted images …");
let idx = 1;
for (const { filePath, ext } of scored) {
  const destPath = resolve(dest, `${idx}${ext}`);
  await copyFile(filePath, destPath);
  console.log(`  ${idx}${ext}`);
  idx++;
}

console.log(`Done — ${idx - 1} image(s) written to ${dest}`);
