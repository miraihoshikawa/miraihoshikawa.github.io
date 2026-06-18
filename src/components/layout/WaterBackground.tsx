/**
 * 画面全体にゆっくり昇る泡の背景レイヤー。
 * 固定配置・pointer-events無し・コンテンツの背面(z-0)。
 * SSRで決定的にするため、ランダムを使わず固定パラメータの配列で配置する。
 */
const BUBBLES = [
  { left: "6%", size: 14, dur: 22, delay: 0 },
  { left: "18%", size: 8, dur: 17, delay: 2 },
  { left: "27%", size: 22, dur: 27, delay: 5 },
  { left: "39%", size: 10, dur: 19, delay: 1 },
  { left: "50%", size: 16, dur: 24, delay: 3.5 },
  { left: "61%", size: 7, dur: 15, delay: 0.5 },
  { left: "70%", size: 26, dur: 30, delay: 6 },
  { left: "80%", size: 11, dur: 20, delay: 2.5 },
  { left: "90%", size: 9, dur: 18, delay: 4.5 },
  { left: "44%", size: 6, dur: 14, delay: 3 },
  { left: "13%", size: 18, dur: 26, delay: 7 },
  { left: "85%", size: 15, dur: 23, delay: 1.5 },
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
