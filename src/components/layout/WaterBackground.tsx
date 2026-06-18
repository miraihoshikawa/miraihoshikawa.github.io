/**
 * 画面全体にゆっくり昇る泡の背景レイヤー。
 * 固定配置・pointer-events無し・コンテンツの背面(z-0)。
 * SSRで決定的にするため、ランダムを使わず固定パラメータの配列で配置する。
 */
const BUBBLES = [
  { left: "6%", size: 14, dur: 26, delay: 0, drift: 0 },
  { left: "18%", size: 8, dur: 20, delay: 6, drift: 0 },
  { left: "27%", size: 22, dur: 34, delay: 12, drift: 0 },
  { left: "39%", size: 10, dur: 23, delay: 3, drift: 0 },
  { left: "50%", size: 16, dur: 30, delay: 9, drift: 0 },
  { left: "61%", size: 7, dur: 18, delay: 1, drift: 0 },
  { left: "70%", size: 26, dur: 38, delay: 15, drift: 0 },
  { left: "80%", size: 11, dur: 24, delay: 5, drift: 0 },
  { left: "90%", size: 9, dur: 21, delay: 11, drift: 0 },
  { left: "44%", size: 6, dur: 17, delay: 8, drift: 0 },
  { left: "13%", size: 18, dur: 32, delay: 18, drift: 0 },
  { left: "85%", size: 15, dur: 28, delay: 2, drift: 0 },
];

export function WaterBackground() {
  return (
    <div className="water-bg" aria-hidden="true">
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
