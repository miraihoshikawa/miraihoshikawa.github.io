#!/usr/bin/env node
/**
 * content/{projects,articles}/{slug}/images/* を
 * public/images/{projects,articles}/{slug}/* にミラーリング。
 *
 * - ラスタ画像 (jpg/png) は sharp で最大幅 1920px に縮小 + 再圧縮
 *   （拡張子は維持するので MDX / frontmatter の参照はそのまま動く）
 * - HEIC / 隠しファイル(.DS_Store等) / "_" 始まりは除外
 * - 既にコピー済みで元ファイルが新しくない場合はスキップ（mtime 比較）
 * - contentにないslugフォルダはpublicから削除（クリーンミラー）
 * - dev / build の前に自動実行（package.json の predev / prebuild）
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const KINDS = ["projects", "articles"];

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 75;
const PNG_QUALITY = 80;
const RASTER_JPEG = /\.(jpe?g)$/i;
const RASTER_PNG = /\.png$/i;
const ALLOWED = /\.(jpe?g|png|webp|avif|gif|svg|mp4)$/i;

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function listDirs(p) {
  if (!(await exists(p))) return [];
  const entries = await fs.readdir(p, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function isUpToDate(src, dst) {
  try {
    const [s, d] = await Promise.all([fs.stat(src), fs.stat(dst)]);
    return d.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

let converted = 0;
let skipped = 0;
let copied = 0;

async function processFile(src, dst) {
  if (await isUpToDate(src, dst)) {
    skipped++;
    return;
  }
  const name = path.basename(src);
  try {
    if (RASTER_JPEG.test(name)) {
      await sharp(src)
        .rotate() // EXIF回転を反映
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(dst);
      converted++;
      return;
    }
    if (RASTER_PNG.test(name)) {
      await sharp(src)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
        .toFile(dst);
      converted++;
      return;
    }
  } catch (err) {
    console.warn(`  ⚠ sharp failed on ${name}, copying as-is: ${err.message}`);
  }
  await fs.copyFile(src, dst);
  copied++;
}

async function syncDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });

  const srcEntries = await fs.readdir(src, { withFileTypes: true });
  const wanted = new Set();

  for (const e of srcEntries) {
    if (e.name.startsWith(".") || e.name.startsWith("_")) continue;
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) {
      wanted.add(e.name);
      await syncDir(s, d);
    } else if (e.isFile() && ALLOWED.test(e.name)) {
      wanted.add(e.name);
      await processFile(s, d);
    }
  }

  // public側の余剰ファイル削除
  for (const e of await fs.readdir(dst, { withFileTypes: true })) {
    if (!wanted.has(e.name)) {
      await fs.rm(path.join(dst, e.name), { recursive: true, force: true });
    }
  }
}

async function syncKind(kind) {
  const contentRoot = path.join(ROOT, "content", kind);
  const publicRoot = path.join(ROOT, "public", "images", kind);
  await fs.mkdir(publicRoot, { recursive: true });

  const slugs = await listDirs(contentRoot);
  const wanted = new Set(slugs);

  for (const existing of await listDirs(publicRoot)) {
    if (!wanted.has(existing)) {
      await fs.rm(path.join(publicRoot, existing), {
        recursive: true,
        force: true,
      });
      console.log(`  rm  public/images/${kind}/${existing}`);
    }
  }

  let n = 0;
  for (const slug of slugs) {
    const srcImages = path.join(contentRoot, slug, "images");
    const dstImages = path.join(publicRoot, slug);
    if (!(await exists(srcImages))) continue;
    await syncDir(srcImages, dstImages);
    n++;
  }
  return n;
}

async function main() {
  console.log("sync-images: content/ -> public/images/ (sharp compress)");
  for (const kind of KINDS) {
    const n = await syncKind(kind);
    console.log(`  ${kind}: ${n} folders`);
  }
  console.log(
    `  converted: ${converted}, copied: ${copied}, up-to-date: ${skipped}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
