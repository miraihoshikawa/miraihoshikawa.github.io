"use client";

import { useEffect, useRef } from "react";

/**
 * 流れる水／インクのようなフルスクリーン背景アニメーション。
 * 依存なし（Canvas 2D）。フローフィールドに沿って粒子を流し、
 * 残像を残すことで「currents in deep water」の質感を出す。
 * prefers-reduced-motion では静止グラデーションにフォールバック。
 */
export function HeroFluid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; life: number; hue: number };
    let particles: P[] = [];
    const COUNT = reduce ? 0 : 220;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintBackground();
    }

    function paintBackground() {
      const g = ctx!.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#0a2348");
      g.addColorStop(0.5, "#08203f");
      g.addColorStop(1, "#050f22");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, w, h);
    }

    function spawn(): P {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        life: 60 + Math.random() * 220,
        hue: 195 + Math.random() * 35, // 水色〜シアン
      };
    }

    // 時間とともにゆっくり変化するフローフィールド（layered sine, ノイズ近似）
    function flow(x: number, y: number, t: number) {
      const s = 0.0016;
      const a =
        Math.sin(x * s + t * 0.0003) +
        Math.cos(y * s * 1.3 - t * 0.0004) +
        Math.sin((x + y) * s * 0.6 + t * 0.0002);
      return a * Math.PI; // 角度
    }

    let raf = 0;
    let t = 0;

    function frame() {
      t += 16;
      // 残像（暗い半透明で薄く塗り重ねる＝トレイルが残る）
      ctx!.fillStyle = "rgba(6, 16, 34, 0.06)";
      ctx!.fillRect(0, 0, w, h);

      for (const p of particles) {
        const ang = flow(p.x, p.y, t);
        p.vx += Math.cos(ang) * 0.12;
        p.vy += Math.sin(ang) * 0.12;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        const speed = Math.min(1, Math.hypot(p.vx, p.vy) / 2.2);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 90%, ${55 + speed * 25}%, ${0.05 + speed * 0.28})`;
        ctx!.fill();

        if (
          p.life <= 0 ||
          p.x < -20 ||
          p.x > w + 20 ||
          p.y < -20 ||
          p.y > h + 20
        ) {
          Object.assign(p, spawn());
        }
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    if (!reduce) {
      particles = Array.from({ length: COUNT }, spawn);
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
