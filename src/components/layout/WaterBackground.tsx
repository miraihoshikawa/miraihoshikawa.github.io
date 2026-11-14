/**
 * 画面全体に昇る光の粒の背景レイヤー（黒地に漂う小さな白い点）。
 * 固定配置・pointer-events無し・コンテンツの背面(z-0)。
 * SSRで決定的にするため、ランダムを使わず固定パラメータの配列で配置する。
 */
// delay を負にして、読み込んだ時点ですでに画面のあちこちで昇っている状態から始める
const BUBBLES = [
  { left: "6%", size: 4, dur: 17, delay: -3 },
  { left: "11%", size: 3, dur: 14, delay: -9 },
  { left: "15%", size: 5, dur: 20, delay: -17 },
  { left: "18%", size: 3, dur: 13, delay: -5 },
  { left: "24%", size: 6, dur: 21, delay: -14 },
  { left: "30%", size: 3, dur: 15, delay: -1 },
  { left: "36%", size: 4, dur: 18, delay: -11 },
  { left: "42%", size: 3, dur: 12, delay: -6 },
  { left: "49%", size: 5, dur: 19, delay: -2 },
  { left: "55%", size: 3, dur: 13, delay: -10 },
  { left: "58%", size: 4, dur: 17, delay: -15 },
  { left: "61%", size: 3, dur: 12, delay: -4 },
  { left: "67%", size: 7, dur: 23, delay: -16 },
  { left: "73%", size: 3, dur: 16, delay: -8 },
  { left: "78%", size: 4, dur: 15, delay: -12 },
  { left: "84%", size: 4, dur: 18, delay: -0.5 },
  { left: "90%", size: 3, dur: 14, delay: -7 },
  { left: "95%", size: 5, dur: 20, delay: -13 },
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
