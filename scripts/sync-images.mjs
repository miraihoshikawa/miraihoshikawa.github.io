#!/usr/bin/env node
/**
 * content/{projects,articles}/{slug}/images/* を
 * public/images/{projects,articles}/{slug}/* にミラーリング。
 *
 * - 既存ファイルがあっても上書き
 * - public 側で content にないものは削除（クリーンミラー）
 * - dev / build の前に自動で実行（package.json の predev / prebuild）
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const KINDS = ["projects", "articles"];

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

async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) {
      await copyDir(s, d);
    } else if (e.isFile()) {
      await fs.copyFile(s, d);
    }
  }
}

async function syncKind(kind) {
  const contentRoot = path.join(ROOT, "content", kind);
  const publicRoot = path.join(ROOT, "public", "images", kind);
  await fs.mkdir(publicRoot, { recursive: true });

  const slugs = await listDirs(contentRoot);
  const wanted = new Set(slugs);

  // クリーンアップ: contentに存在しないslugフォルダをpublicから削除
  for (const existing of await listDirs(publicRoot)) {
    if (!wanted.has(existing)) {
      await fs.rm(path.join(publicRoot, existing), { recursive: true, force: true });
      console.log(`  rm  public/images/${kind}/${existing}`);
    }
  }

  let copied = 0;
  for (const slug of slugs) {
    const srcImages = path.join(contentRoot, slug, "images");
    const dstImages = path.join(publicRoot, slug);
    if (!(await exists(srcImages))) continue;
    // 上書きのため一度削除
    await fs.rm(dstImages, { recursive: true, force: true });
    await copyDir(srcImages, dstImages);
    copied++;
  }
  return copied;
}

async function main() {
  console.log("sync-images: content/ -> public/images/");
  for (const kind of KINDS) {
    const n = await syncKind(kind);
    console.log(`  ${kind}: ${n} folders synced`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
