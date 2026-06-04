/* eslint-disable @next/next/no-img-element */
import { getAllProjects } from "@/lib/content";
const projects = getAllProjects();
import { profile } from "@/data/profile";

const C = {
  bg: "#0a0a0a",
  bg2: "#141414",
  text: "#e8e8e8",
  textSub: "#5a5a5a",
  card: "#161616",
  border: "#2a2a2a",
  blue: "#2a5aaa",
  blueDark: "#1a3a6a",
  blueSub: "#1e4888",
};

const IMG = {
  portrait: "/images/profile/portrait.jpeg",
  works: [
    "/images/works/streaming.jpg",
    "/images/works/innofes.jpg",
    "/images/works/bakebake.png",
    "/images/works/master-remote.png",
    "/images/works/vital-room.png",
    "/images/works/kaleid.jpeg",
  ],
};

const planNames = [
  { id: "quiet-horizon", label: "1. Quiet Horizon", desc: "静かな水平線 — 左右分割Hero + 横スクロールWorks" },
  { id: "blueprint-grid", label: "2. Blueprint Grid", desc: "設計図グリッド — コンパクトHero + 正方形グリッド" },
  { id: "split-narrative", label: "3. Split Narrative", desc: "分割ナラティブ — 50/50写真+テキスト + 左右交互Works" },
  { id: "index-card", label: "4. Index Card", desc: "インデックス — テキストHero + 展開式リスト" },
  { id: "floating-panels", label: "5. Floating Panels", desc: "浮遊パネル — オフセット写真 + メイソンリー" },
  { id: "terminal", label: "6. Terminal", desc: "ターミナル — コード風Hero + ウィンドウカード" },
  { id: "sidebar-portrait", label: "7. Sidebar Portrait", desc: "サイドバー — 固定写真 + 横長カードスタック" },
  { id: "stacked-chapters", label: "8. Stacked Chapters", desc: "チャプター — 写真背景Hero + フルページ作品" },
  { id: "asymmetric-blocks", label: "9. Asymmetric Blocks", desc: "非対称ブロック — 非対称分割 + オフセットグリッド" },
  { id: "data-layers", label: "10. Data Layers", desc: "データレイヤー — 3層Hero + フィルタグリッド" },
];

export default function DesignShowcase() {
  return (
    <div style={{ background: "#fff" }} className="pt-14">
      {/* Index */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold">2G Mono Silver + Deep Blue — 10 Layout Plans</h1>
        <p className="mt-2 text-sm text-gray-500">
          2G をベースに、レイアウト・構成・ディテールを変えた10プラン
        </p>
        <nav className="mt-6 flex flex-wrap gap-2">
          {planNames.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-100">
              {p.label}
            </a>
          ))}
        </nav>
      </div>

      <Plan1QuietHorizon />
      <Plan2BlueprintGrid />
      <Plan3SplitNarrative />
      <Plan4IndexCard />
      <Plan5FloatingPanels />
      <Plan6Terminal />
      <Plan7SidebarPortrait />
      <Plan8StackedChapters />
      <Plan9AsymmetricBlocks />
      <Plan10DataLayers />

      <div className="mx-auto max-w-5xl px-6 py-12 text-center">
        <p className="text-sm text-gray-500">気に入ったプラン番号（1〜10）を教えてください</p>
      </div>
    </div>
  );
}

/* ─── Label Bar ─── */
function LabelBar({ id, label, desc }: { id: string; label: string; desc: string }) {
  return (
    <div id={id} className="scroll-mt-14" style={{ borderTop: `3px solid ${C.blue}`, background: C.card, padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.blue }}>{label}</span>
      <span style={{ fontSize: 11, color: C.textSub }}>{desc}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 1: Quiet Horizon — 左右分割 + 横スクロール
   ═══════════════════════════════════════════════ */
function Plan1QuietHorizon() {
  return (
    <section>
      <LabelBar {...planNames[0]} />
      <div style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`, minHeight: 600 }}>
        {/* Hero */}
        <div style={{ display: "flex", alignItems: "center", minHeight: 400, maxWidth: 1100, margin: "0 auto", padding: "60px 40px", gap: 48 }}>
          {/* Left: Text */}
          <div style={{ flex: "0 0 40%" }}>
            <div style={{ width: 40, height: 1, background: C.blue, marginBottom: 24 }} />
            <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue, textTransform: "uppercase" }}>Portfolio</p>
            <h2 style={{ fontSize: 28, fontWeight: 600, color: C.text, marginTop: 12 }}>{profile.name}</h2>
            <p style={{ fontSize: 12, color: C.textSub, marginTop: 4, letterSpacing: 4 }}>{profile.nameEn}</p>
            <p style={{ fontSize: 11, color: C.textSub, marginTop: 6 }}>{profile.university}</p>
            <p style={{ fontSize: 13, color: `${C.textSub}cc`, marginTop: 20, lineHeight: 2 }}>{profile.tagline}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
              {profile.axes.map((a) => (
                <span key={a.label} style={{ fontSize: 9, padding: "3px 10px", border: `1px solid ${C.border}`, color: C.textSub, borderRadius: 2 }}>{a.label}</span>
              ))}
            </div>
          </div>
          {/* Right: Photo */}
          <div style={{ flex: 1, position: "relative" }}>
            <img src={IMG.portrait} alt="profile" style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: 4, filter: "brightness(0.85)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: C.blue }} />
          </div>
        </div>

        {/* Works: Horizontal scroll */}
        <div style={{ padding: "20px 40px 60px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue, marginBottom: 16 }}>WORKS</p>
          </div>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", padding: "0 40px 16px", scrollSnapType: "x mandatory" }}>
            {projects.slice(0, 6).map((p, i) => (
              <div key={p.slug} style={{ flex: "0 0 360px", scrollSnapAlign: "start", position: "relative", borderRadius: 6, overflow: "hidden" }}>
                <img src={IMG.works[i]} alt={p.title} style={{ width: "100%", height: 200, objectFit: "cover", filter: "brightness(0.5)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 16px 14px", background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                  <span style={{ fontSize: 10, color: C.blue, fontFamily: "monospace" }}>{p.number}</span>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.text, marginTop: 4 }}>{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 2: Blueprint Grid — 設計図 + 正方形グリッド
   ═══════════════════════════════════════════════ */
function Plan2BlueprintGrid() {
  return (
    <section>
      <LabelBar {...planNames[1]} />
      <div style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`,
        minHeight: 600,
        backgroundImage: `linear-gradient(${C.blue}08 1px, transparent 1px), linear-gradient(90deg, ${C.blue}08 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}>
        {/* Hero: Compact centered */}
        <div style={{ textAlign: "center", padding: "60px 24px 40px" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", border: `2px solid ${C.blue}`, margin: "0 auto", overflow: "hidden" }}>
            <img src={IMG.portrait} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: C.text, marginTop: 16 }}>{profile.name}</h2>
          <p style={{ fontSize: 11, color: C.textSub, letterSpacing: 4, marginTop: 4 }}>{profile.nameEn}</p>
          <p style={{ fontSize: 12, color: `${C.textSub}cc`, marginTop: 12, maxWidth: 400, margin: "12px auto 0", lineHeight: 1.8 }}>{profile.tagline}</p>
        </div>

        {/* Works: 3-col square grid */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>
          <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue, marginBottom: 16 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, background: C.blue, borderRadius: 1, marginRight: 8, verticalAlign: "middle" }} />
            WORKS
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {projects.slice(0, 6).map((p, i) => (
              <div key={p.slug} style={{ position: "relative", aspectRatio: "1/1", borderRadius: 4, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <img src={IMG.works[i]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 14, background: "linear-gradient(transparent 40%, rgba(0,0,0,0.7))" }}>
                  <span style={{ fontSize: 10, color: C.blue, fontFamily: "monospace" }}>{p.number}</span>
                  <p style={{ fontSize: 12, fontWeight: 600, color: C.text, marginTop: 2, lineHeight: 1.4 }}>{p.title}</p>
                  {p.category === "research" && (
                    <span style={{ fontSize: 9, color: C.blue, border: `1px solid ${C.blue}60`, padding: "1px 6px", borderRadius: 2, marginTop: 6, alignSelf: "flex-start" }}>Research</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 3: Split Narrative — 50/50分割 + 交互配置
   ═══════════════════════════════════════════════ */
function Plan3SplitNarrative() {
  return (
    <section>
      <LabelBar {...planNames[2]} />
      <div style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`, minHeight: 600 }}>
        {/* Hero: 50/50 split */}
        <div style={{ display: "flex", minHeight: 420 }}>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <img src={IMG.portrait} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} />
          </div>
          <div style={{ width: 1, background: C.blue }} />
          <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "40px 48px" }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue, textTransform: "uppercase" }}>Portfolio</p>
              <h2 style={{ fontSize: 28, fontWeight: 600, color: C.text, marginTop: 12 }}>{profile.name}</h2>
              <p style={{ fontSize: 12, color: C.textSub, letterSpacing: 4, marginTop: 4 }}>{profile.nameEn}</p>
              <p style={{ fontSize: 11, color: C.textSub, marginTop: 8 }}>{profile.university}</p>
              <p style={{ fontSize: 13, color: `${C.textSub}cc`, marginTop: 20, lineHeight: 2 }}>{profile.tagline}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
                {profile.axes.map((a) => (
                  <span key={a.label} style={{ fontSize: 9, padding: "3px 10px", border: `1px solid ${C.border}`, color: C.textSub, borderRadius: 2 }}>{a.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Works: Alternating left-right */}
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 60px" }}>
          {projects.slice(0, 4).map((p, i) => (
            <div key={p.slug} style={{ display: "flex", flexDirection: i % 2 === 0 ? "row" : "row-reverse", gap: 32, marginBottom: 40, alignItems: "center" }}>
              <div style={{ flex: "0 0 45%", borderRadius: 4, overflow: "hidden" }}>
                <img src={IMG.works[i]} alt={p.title} style={{ width: "100%", height: 200, objectFit: "cover", filter: "brightness(0.6)" }} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 40, fontWeight: 700, color: `${C.text}08`, position: "absolute" }}>{p.number}</span>
                <span style={{ fontSize: 10, color: C.blue, fontFamily: "monospace" }}>{p.number}</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: C.text, marginTop: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: C.textSub, marginTop: 8, lineHeight: 1.8 }}>{p.tagline}</p>
                {p.category === "research" && (
                  <span style={{ fontSize: 9, background: `${C.blue}20`, color: C.blue, padding: "2px 8px", borderRadius: 10, marginTop: 10, display: "inline-block" }}>Research</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 4: Index Card — テキストのみHero + 展開式リスト
   ═══════════════════════════════════════════════ */
function Plan4IndexCard() {
  return (
    <section>
      <LabelBar {...planNames[3]} />
      <div style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`, minHeight: 600 }}>
        {/* Hero: Minimal text only */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: C.text }}>{profile.name}</h2>
            <div style={{ width: 1, height: 16, background: C.blue }} />
            <p style={{ fontSize: 12, color: C.textSub, letterSpacing: 3 }}>{profile.nameEn}</p>
          </div>
          <p style={{ fontSize: 12, color: `${C.textSub}bb`, marginTop: 12, lineHeight: 1.8 }}>{profile.tagline}</p>
          <div style={{ width: "100%", height: 1, background: C.blue, marginTop: 24, opacity: 0.3 }} />
        </div>

        {/* About with photo */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 32px", display: "flex", gap: 24, alignItems: "flex-start" }}>
          <img src={IMG.portrait} alt="profile" style={{ width: 100, height: 130, objectFit: "cover", borderRadius: 4, filter: "brightness(0.85)" }} />
          <div>
            <p style={{ fontSize: 11, color: C.textSub }}>{profile.university}</p>
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              {profile.axes.map((a) => (
                <span key={a.label} style={{ fontSize: 9, padding: "2px 8px", border: `1px solid ${C.border}`, color: C.textSub, borderRadius: 2 }}>{a.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Works: Index list */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>
          <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue, marginBottom: 16 }}>WORKS</p>
          {projects.slice(0, 6).map((p, i) => (
            <div key={p.slug}>
              <div style={{ display: "flex", alignItems: "center", padding: "14px 0", gap: 16 }}>
                <span style={{ fontSize: 11, color: C.blue, fontFamily: "monospace", flex: "0 0 30px" }}>{p.number}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: C.text, flex: 1 }}>{p.title}</span>
                <span style={{ fontSize: 9, color: C.textSub, border: `1px solid ${C.border}`, padding: "2px 8px", borderRadius: 2 }}>{p.category}</span>
                <span style={{ fontSize: 11, color: C.textSub, flex: "0 0 60px", textAlign: "right" }}>{p.year}</span>
              </div>
              {/* Expanded preview for first item */}
              {i === 0 && (
                <div style={{ borderLeft: `3px solid ${C.blue}`, marginLeft: 30, padding: "12px 0 12px 16px", marginBottom: 8 }}>
                  <div style={{ display: "flex", gap: 16 }}>
                    <img src={IMG.works[0]} alt="" style={{ width: 160, height: 90, objectFit: "cover", borderRadius: 4, filter: "brightness(0.6)" }} />
                    <div>
                      <p style={{ fontSize: 11, color: C.textSub, lineHeight: 1.8 }}>{p.tagline}</p>
                      <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                        {p.tools?.map((t) => (
                          <span key={t} style={{ fontSize: 9, padding: "1px 6px", border: `1px solid ${C.border}`, color: C.textSub, borderRadius: 2 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div style={{ height: 1, background: C.border, opacity: 0.4 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 5: Floating Panels — 浮遊パネル + メイソンリー
   ═══════════════════════════════════════════════ */
function Plan5FloatingPanels() {
  return (
    <section>
      <LabelBar {...planNames[4]} />
      <div style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`, minHeight: 600 }}>
        {/* Hero: Floating elements */}
        <div style={{ display: "flex", alignItems: "center", minHeight: 380, maxWidth: 1000, margin: "0 auto", padding: "60px 40px", gap: 48 }}>
          <div style={{ flex: "0 0 200px", boxShadow: `8px 8px 30px ${C.blueDark}33`, borderRadius: 6 }}>
            <img src={IMG.portrait} alt="profile" style={{ width: 200, height: 280, objectFit: "cover", borderRadius: 6 }} />
          </div>
          <div style={{ flex: 1, paddingLeft: 16 }}>
            <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue }}>PORTFOLIO</p>
            <h2 style={{ fontSize: 26, fontWeight: 600, color: C.text, marginTop: 10 }}>{profile.name}</h2>
            <p style={{ fontSize: 11, color: C.textSub, letterSpacing: 4, marginTop: 4 }}>{profile.nameEn}</p>
            <p style={{ fontSize: 11, color: C.textSub, marginTop: 6 }}>{profile.university}</p>
            <p style={{ fontSize: 12, color: `${C.textSub}cc`, marginTop: 16, lineHeight: 2, maxWidth: 380 }}>{profile.tagline}</p>
          </div>
        </div>

        {/* Works: Masonry-like */}
        <div style={{
          maxWidth: 1000, margin: "0 auto", padding: "0 40px 60px",
          backgroundImage: `radial-gradient(ellipse at center, ${C.blue}06 0%, transparent 70%)`,
        }}>
          <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue, marginBottom: 20 }}>WORKS</p>
          <div style={{ columns: 3, columnGap: 16 }}>
            {projects.slice(0, 6).map((p, i) => (
              <div key={p.slug} style={{
                breakInside: "avoid", marginBottom: 16, background: C.card,
                borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`,
              }}>
                <img src={IMG.works[i]} alt={p.title} style={{
                  width: "100%", height: i % 3 === 0 ? 180 : i % 3 === 1 ? 140 : 120,
                  objectFit: "cover", filter: "brightness(0.55)",
                }} />
                <div style={{ padding: 14 }}>
                  <span style={{ fontSize: 10, color: C.blue, fontFamily: "monospace" }}>{p.number}</span>
                  <p style={{ fontSize: 12, fontWeight: 600, color: C.text, marginTop: 4, lineHeight: 1.4 }}>{p.title}</p>
                  <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                    {(p.tools ?? []).slice(0, 2).map((t) => (
                      <span key={t} style={{ fontSize: 9, border: `1px solid ${C.blue}50`, color: C.blue, padding: "1px 6px", borderRadius: 2 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 6: Terminal — ターミナル風
   ═══════════════════════════════════════════════ */
function Plan6Terminal() {
  return (
    <section>
      <LabelBar {...planNames[5]} />
      <div style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`, minHeight: 600,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.text}02 2px, ${C.text}02 3px)`,
      }}>
        {/* Hero: Terminal style */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "monospace" }}>
              <p style={{ fontSize: 14, color: C.text }}>
                <span style={{ color: C.blue }}>&gt; </span>
                {profile.name}
                <span style={{ color: C.textSub }}> // </span>
                <span style={{ color: C.textSub }}>{profile.nameEn}</span>
                <span style={{ display: "inline-block", width: 8, height: 16, background: C.blue, marginLeft: 4, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
              </p>
              <p style={{ fontSize: 11, color: C.textSub, marginTop: 8, fontFamily: "monospace" }}>
                <span style={{ color: C.blue }}>$ </span>cat profile.txt
              </p>
              <p style={{ fontSize: 12, color: `${C.textSub}cc`, marginTop: 8, lineHeight: 1.8, maxWidth: 500 }}>{profile.tagline}</p>
              <p style={{ fontSize: 11, color: C.textSub, marginTop: 12, fontFamily: "monospace" }}>
                <span style={{ color: C.blue }}>$ </span>echo $AFFILIATION
              </p>
              <p style={{ fontSize: 11, color: C.textSub, marginTop: 4 }}>{profile.university}</p>
            </div>
            <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: `1px solid ${C.border}` }}>
              <img src={IMG.portrait} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>

        {/* Works: Terminal window cards */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>
          <p style={{ fontSize: 11, color: C.textSub, marginBottom: 16, fontFamily: "monospace" }}>
            <span style={{ color: C.blue }}>$ </span>ls ./works/
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {projects.slice(0, 6).map((p, i) => (
              <div key={p.slug} style={{ background: C.card, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                {/* Title bar */}
                <div style={{ background: "#1a1a1a", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57", opacity: 0.4 }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e", opacity: 0.4 }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.blue, opacity: 0.6 }} />
                  <span style={{ fontSize: 9, color: C.textSub, marginLeft: 8, fontFamily: "monospace" }}>{p.slug}</span>
                </div>
                <img src={IMG.works[i]} alt={p.title} style={{ width: "100%", height: 140, objectFit: "cover", filter: "brightness(0.5)" }} />
                <div style={{ padding: "10px 12px", fontFamily: "monospace" }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{p.title}</p>
                  <span style={{ fontSize: 9, color: C.blue }}>[{p.category}]</span>
                  <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                    {(p.tools ?? []).slice(0, 3).map((t) => (
                      <span key={t} style={{ fontSize: 9, color: C.textSub, background: `${C.text}08`, padding: "1px 6px", borderRadius: 2 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 7: Sidebar Portrait — サイドバー固定
   ═══════════════════════════════════════════════ */
function Plan7SidebarPortrait() {
  return (
    <section>
      <LabelBar {...planNames[6]} />
      <div style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`, minHeight: 600, display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 260, background: "#0e0e0e", borderRight: `1px solid ${C.blue}`, padding: "32px 20px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={IMG.portrait} alt="profile" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 4 }} />
          <h2 style={{ fontSize: 16, fontWeight: 600, color: C.text, marginTop: 16, textAlign: "center" }}>{profile.name}</h2>
          <p style={{ fontSize: 10, color: C.textSub, letterSpacing: 3, marginTop: 4, textAlign: "center" }}>{profile.nameEn}</p>
          <p style={{ fontSize: 10, color: C.textSub, marginTop: 8, textAlign: "center" }}>{profile.university}</p>
          <nav style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
            {["Works", "About", "Skills", "Experience", "Contact"].map((n, i) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 4, background: i === 0 ? `${C.blue}15` : "transparent" }}>
                <div style={{ width: 3, height: 14, background: i === 0 ? C.blue : "transparent", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: i === 0 ? C.text : C.textSub }}>{n}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "32px 40px", overflow: "auto" }}>
          <p style={{ fontSize: 12, color: `${C.textSub}cc`, lineHeight: 2, maxWidth: 540 }}>{profile.tagline}</p>
          <div style={{ height: 1, background: C.border, margin: "24px 0", opacity: 0.4 }} />
          <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue, marginBottom: 20 }}>WORKS</p>
          {projects.slice(0, 4).map((p, i) => (
            <div key={p.slug} style={{ display: "flex", gap: 20, marginBottom: 20, background: C.card, borderRadius: 6, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <img src={IMG.works[i]} alt={p.title} style={{ width: "40%", height: 140, objectFit: "cover", filter: "brightness(0.55)" }} />
              <div style={{ padding: "16px 16px 16px 0", flex: 1 }}>
                <span style={{ fontSize: 10, color: C.blue, fontFamily: "monospace" }}>{p.number}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, marginTop: 4 }}>{p.title}</p>
                <p style={{ fontSize: 11, color: C.textSub, marginTop: 6, lineHeight: 1.6 }}>{p.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 8: Stacked Chapters — フルページチャプター
   ═══════════════════════════════════════════════ */
function Plan8StackedChapters() {
  return (
    <section>
      <LabelBar {...planNames[7]} />
      <div style={{ background: C.bg, minHeight: 600 }}>
        {/* Hero: Photo as darkened background */}
        <div style={{ position: "relative", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={IMG.portrait} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }} />
          <div style={{ position: "relative", textAlign: "center", padding: "60px 24px" }}>
            <div style={{ width: 40, height: 2, background: C.blue, margin: "0 auto 20px" }} />
            <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue }}>PORTFOLIO</p>
            <h2 style={{ fontSize: 32, fontWeight: 600, color: C.text, marginTop: 12 }}>{profile.name}</h2>
            <p style={{ fontSize: 11, color: C.textSub, letterSpacing: 4, marginTop: 4 }}>{profile.nameEn}</p>
            <p style={{ fontSize: 12, color: `${C.textSub}cc`, marginTop: 16, lineHeight: 1.8, maxWidth: 380, margin: "16px auto 0" }}>{profile.tagline}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "center" }}>
              {profile.axes.map((a) => (
                <div key={a.label} style={{ padding: "10px 16px", borderTop: `2px solid ${C.blue}`, background: `${C.card}dd` }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: C.text }}>{a.label}</p>
                  <p style={{ fontSize: 9, color: C.textSub, marginTop: 4, maxWidth: 140 }}>{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Works: Full-height chapters */}
        {projects.slice(0, 3).map((p, i) => (
          <div key={p.slug} style={{ position: "relative", minHeight: 350, display: "flex", alignItems: "center" }}>
            <img src={IMG.works[i]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${C.bg}ee 0%, ${C.bg}88 60%, transparent)` }} />
            <div style={{ position: "relative", padding: "40px 48px", maxWidth: 500 }}>
              <span style={{ fontSize: 48, fontWeight: 700, color: C.blue, opacity: 0.3 }}>{p.number}</span>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: C.text, marginTop: -8 }}>{p.title}</h3>
              <p style={{ fontSize: 12, color: C.textSub, marginTop: 10, lineHeight: 1.8 }}>{p.tagline}</p>
              <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
                {(p.tools ?? []).slice(0, 3).map((t) => (
                  <span key={t} style={{ fontSize: 9, border: `1px solid ${C.blue}50`, color: C.blue, padding: "2px 8px", borderRadius: 2 }}>{t}</span>
                ))}
              </div>
            </div>
            {/* Progress dot */}
            <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.blue }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 9: Asymmetric Blocks — 非対称 + オフセットグリッド
   ═══════════════════════════════════════════════ */
function Plan9AsymmetricBlocks() {
  return (
    <section>
      <LabelBar {...planNames[8]} />
      <div style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`, minHeight: 600 }}>
        {/* Hero: Asymmetric */}
        <div style={{ display: "flex", alignItems: "center", minHeight: 380, maxWidth: 1000, margin: "0 auto", padding: "60px 40px", gap: 0 }}>
          {/* Left text */}
          <div style={{ flex: 1, paddingLeft: "8vw" }}>
            <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue }}>PORTFOLIO</p>
            <h2 style={{ fontSize: 28, fontWeight: 600, color: C.text, marginTop: 12 }}>{profile.name}</h2>
            <p style={{ fontSize: 11, color: C.textSub, letterSpacing: 4, marginTop: 4 }}>{profile.nameEn}</p>
            <p style={{ fontSize: 11, color: C.textSub, marginTop: 6 }}>{profile.university}</p>
            <p style={{ fontSize: 13, color: `${C.textSub}cc`, marginTop: 20, lineHeight: 2, maxWidth: 360 }}>{profile.tagline}</p>
          </div>
          {/* Floating blue line */}
          <div style={{ width: 1, height: 180, background: C.blue, opacity: 0.4, flexShrink: 0, margin: "0 32px" }} />
          {/* Right photo — compact */}
          <div style={{ flex: "0 0 200px", position: "relative" }}>
            <img src={IMG.portrait} alt="profile" style={{ width: 200, height: 260, objectFit: "cover", borderRadius: 4 }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: `linear-gradient(to bottom, transparent 60%, ${C.blueDark}40)` }} />
          </div>
        </div>

        {/* Works: Offset grid */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 60px" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 20 }}>
            <span style={{ color: C.blue }}>/</span> Works
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {projects.slice(0, 6).map((p, i) => (
              <div key={p.slug} style={{
                marginTop: i % 2 === 1 ? 80 : 0,
                background: C.card, borderRadius: 6, overflow: "hidden",
                border: `1px solid ${C.border}`,
              }}>
                <img src={IMG.works[i]} alt={p.title} style={{ width: "100%", height: 180, objectFit: "cover", filter: "brightness(0.5)" }} />
                <div style={{ padding: 16 }}>
                  <span style={{ fontSize: 10, color: C.blue, fontFamily: "monospace" }}>{p.number}</span>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.text, marginTop: 4 }}>{p.title}</p>
                  <p style={{ fontSize: 11, color: C.textSub, marginTop: 4, lineHeight: 1.6 }}>{p.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PLAN 10: Data Layers — 3層Hero + フィルタ
   ═══════════════════════════════════════════════ */
function Plan10DataLayers() {
  return (
    <section>
      <LabelBar {...planNames[9]} />
      <div style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)`, minHeight: 600,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q50 80 100 100 T200 100' fill='none' stroke='%232a5aaa' stroke-width='0.5' opacity='0.06'/%3E%3Cpath d='M0 140 Q50 120 100 140 T200 140' fill='none' stroke='%232a5aaa' stroke-width='0.5' opacity='0.04'/%3E%3Cpath d='M0 60 Q50 40 100 60 T200 60' fill='none' stroke='%232a5aaa' stroke-width='0.5' opacity='0.04'/%3E%3C/svg%3E")`,
      }}>
        {/* Hero: Layered */}
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 40px 40px", display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, letterSpacing: 6, color: C.blue }}>PORTFOLIO</p>
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 12 }}>
              <h2 style={{ fontSize: 26, fontWeight: 600, color: C.text, whiteSpace: "nowrap" }}>{profile.name}</h2>
              <div style={{ flex: 1, height: 1, background: C.blue, marginLeft: 16, opacity: 0.4 }} />
            </div>
            <p style={{ fontSize: 11, color: C.textSub, letterSpacing: 4, marginTop: 4 }}>{profile.nameEn}</p>
            <p style={{ fontSize: 12, color: `${C.textSub}cc`, marginTop: 16, lineHeight: 2, maxWidth: 400 }}>{profile.tagline}</p>
            <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
              {[
                { num: "7", label: "Projects" },
                { num: "4+", label: "Years" },
                { num: "3", label: "Fields" },
              ].map((s) => (
                <div key={s.label}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: C.blue, fontFamily: "monospace" }}>{s.num}</span>
                  <p style={{ fontSize: 9, color: C.textSub, marginTop: 2 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "0 0 140px" }}>
            <img src={IMG.portrait} alt="profile" style={{ width: 140, height: 180, objectFit: "cover", borderRadius: 4, border: `1px solid ${C.blue}60` }} />
          </div>
        </div>

        {/* Works: Filter + Grid */}
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px 60px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["All", "Research", "Entertainment", "Implementation"].map((f, i) => (
              <button key={f} style={{
                fontSize: 10, padding: "5px 14px", borderRadius: 3, border: "none", cursor: "pointer",
                background: i === 0 ? C.blue : `${C.text}08`,
                color: i === 0 ? "#fff" : C.textSub,
              }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {projects.slice(0, 6).map((p, i) => (
              <div key={p.slug} style={{ position: "relative", aspectRatio: "1/1", borderRadius: 4, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <img src={IMG.works[i]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4)" }} />
                <div style={{ position: "absolute", top: 10, left: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: C.blue, fontFamily: "monospace", opacity: 0.7 }}>{p.number}</span>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
