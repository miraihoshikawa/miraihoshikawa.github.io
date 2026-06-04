# コンテンツ追加ガイド

このサイトに新しい **Works（プロジェクト）** または **Article（記事）** を追加するときの手順書。

## 基本ルール

| 種類 | 配置先 | スラッグ命名規則 |
|------|--------|------------------|
| Works | `content/projects/{NN-slug}/` | `NN-kebab-case`（例: `08-new-work`） |
| Article | `content/articles/{YYYY-MM-DD-slug}/` | `YYYY-MM-DD-kebab-case`（例: `2026-06-10-exhibition-report`） |

- **1コンテンツ = 1フォルダ**。文章と画像を同じフォルダにまとめる。
- スラッグはそのまま公開URLになる（`https://miraihoshikawa.github.io/works/08-new-work/`）。
- 既存のスラッグを変更すると外部リンクが切れる。一度公開したら変えない。

## フォルダ構造

```
content/projects/08-new-work/
├── index.mdx          ← 本文（必須）
├── images/            ← 画像置き場
│   ├── 1.png         ← トップ画像（カバー）。番号最小の画像がカバーになる
│   ├── 2.jpg         ← ギャラリー（番号順）
│   ├── 3.png
│   └── 04-detail.jpg ← サフィックス付きでも数字始まりならギャラリー入り
└── _notes.md          ← 制作メモ等（任意・非公開）
```

### images/ のファイル名ルール

- **`数字始まり.{jpg,jpeg,png,webp,avif,gif}`** — 番号最小がカバー（トップ画）、残りがギャラリー。
  - 例: `1.png` `2.jpg` `3.png` → `1.png` がカバー、`2.jpg` `3.png` がギャラリー
  - `1.png` と `01-detail.png` が併存する場合は `1.png`（純粋な数字のみ）が優先
- **`cover.{jpg,jpeg,png,webp,avif,gif}`** — fallback。数字始まり画像が無いときだけカバーとして使われる。
- **数字始まりでないファイル**（`DSC1234.JPG` `IMG_5678.jpeg` `スクリーンショット.png` 等） — 自動表示されない。表示したい画像は `2.jpg` `3.png` のように番号付きにリネーム。
- **`_` で始まるファイル** — 非公開扱い。下書きやメモに使える。
- **`.` で始まるファイル**（`.DS_Store` 等） — 自動で除外される。
- **`.HEIC`** — ブラウザ非対応。`sips -s format jpeg foo.HEIC --out foo.jpg` で変換。

ファイルを置くだけで `npm run dev` / `npm run build` の前処理が `public/images/projects/{slug}/` に自動コピーする。MDXから明示的にパスを書く必要はない。

## index.mdx の書き方

### Works 用 frontmatter

```mdx
---
number: "08"
title: "プロジェクトタイトル"
subtitle: "サブタイトル（任意）"
category: "research"           # research | entertainment | implementation
year: "2026"
tagline: "1行のキャッチコピー（カード一覧で表示される）"
team: |
  個人制作
  協力: ○○さん
achievements:
  - "イベント名 (2026/X)"
  - "学会発表 (2026/X)"
tools:
  - TouchDesigner
  - Unity
  - Python
imageCount: 4                  # ギャラリーに使う枚数（任意・自動検出されない場合のフォールバック）
academicRef: "干川未来 ほか, \"論文タイトル\", 学会名, 2026年X月"  # 任意
---

ここから Markdown 本文。「制作背景」の本文として表示される。

複数段落も書ける。**強調** や `コード` も使える。

## 見出し

リスト：
- 項目1
- 項目2
```

### Article 用 frontmatter

```mdx
---
title: "記事タイトル"
date: "2026-06-10"
tags:
  - 展示
  - TouchDesigner
summary: "1〜2文の要約。一覧ページに表示される。"
draft: false                   # true にすると公開されない（下書き状態）
---

ここから本文。
```

## 新規追加 → 公開までの流れ

1. **フォルダ作成**
   ```bash
   cd ~/dev/portfolio
   mkdir -p content/projects/08-new-work/images
   ```

2. **画像を配置**
   - 大きい素材から `cover.jpg`、`01.jpg`、`02.jpg` ... を作って `images/` に入れる
   - 推奨: 横長 16:9、長辺 1600〜2000px、JPEGなら品質 80%程度
   - カバー1枚 + ギャラリー2〜4枚が標準

3. **`index.mdx` を作成**
   - 既存プロジェクト（例: `content/projects/01-streaming-interface/index.mdx`）をコピーして編集すると速い

4. **ローカルで確認**
   ```bash
   npm run dev
   # http://localhost:3000/works/08-new-work/ を開く
   ```

5. **公開**
   ```bash
   git add content/projects/08-new-work
   git commit -m "Add: 08 New Work"
   git push
   ```
   GitHub Actions が走り、数分後に `https://miraihoshikawa.github.io/works/08-new-work/` に反映される。

## カテゴリの使い分け（Works）

| category | 用途 | 例 |
|----------|------|----|
| `research` | 研究・学術的取り組み | マスター・リモートシステム、卒研 |
| `entertainment` | 展示・ライブ演出・体験作品 | イノフェス、Vital Room、Kaleid |
| `implementation` | 実運用システム・現場ツール | 配信統合インターフェース |

## トラブルシュート

| 症状 | 対処 |
|------|------|
| 画像が表示されない | `npm run sync-images` を実行 → `public/images/{kind}/{slug}/` にコピーされているか確認 |
| ビルドが失敗する | `npm run build` のエラー出力でMDXのfrontmatter文法エラーを確認 |
| ページが404 | スラッグの綴り、ファイル名 `index.mdx` であることを確認 |
| カバー画像が出ない | `images/cover.{jpg,png,...}` という名前になっているか確認（`Cover.jpg`等の大文字混じりはNG） |

## 既存ディレクトリ参考

| 場所 | 用途 |
|------|------|
| `/Users/mirai/Desktop/06_就活/01_portfolio_2026/` | 元素材・PDF版ポートフォリオ・参考資料 |
| `~/dev/portfolio/` | 本サイトのソース（Git管理） |
| `~/dev/portfolio/content/` | 公開コンテンツ（文章＋画像） |
| `~/dev/portfolio/public/images/` | ビルド時に自動生成（直接編集しない） |
