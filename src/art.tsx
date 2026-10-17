// Sticker artwork: flat fills, black outlines, drawn on a 100×100 grid. Class names mark the parts motion.ts animates.
import type { CSSProperties } from 'react';

export type StickerKind =
  | 'rocket'
  | 'coin'
  | 'check'
  | 'wallet'
  | 'code'
  | 'sparkle'
  | 'bolt'
  | 'taxi'
  | 'ponte'
  | 'braai'
  | 'jacaranda'
  | 'mug'
  | 'terminal'
  | 'browser';

type StickerStyle = CSSProperties & { '--s'?: string };

// Side-on minibus taxi, shared by the sticker and the skyline.
const TAXI = (
  <>
    <g className="taxi-body">
      <path d="M6 70 V44 Q6 32 18 32 H64 Q74 32 82 44 L92 55 Q95 59 95 65 V70 Z" fill="#fff" />
      <path d="M6 56 H94 V62 H6 Z" fill="#fb4903" />
      <rect x="13" y="38" width="15" height="12" rx="3" fill="#dceeff" />
      <rect x="32" y="38" width="15" height="12" rx="3" fill="#dceeff" />
      <rect x="51" y="38" width="13" height="12" rx="3" fill="#dceeff" />
      <path d="M68 38 H73 Q77 38 83 50 H68 Z" fill="#dceeff" />
    </g>
    <circle cx="26" cy="72" r="9" fill="#000" />
    <circle cx="26" cy="72" r="3.5" fill="#ccc" />
    <circle cx="76" cy="72" r="9" fill="#000" />
    <circle cx="76" cy="72" r="3.5" fill="#ccc" />
  </>
);

const STICKERS: Record<StickerKind, JSX.Element> = {
  rocket: (
    <>
      <path className="flame" d="M40 72 Q50 99 60 72 Z" fill="#ffd731" />
      <path d="M34 50 L18 76 L36 70 Z M66 50 L82 76 L64 70 Z" fill="#5c4ade" />
      <path d="M50 6 C67 21 71 44 66 72 L34 72 C29 44 33 21 50 6 Z" fill="#fb4903" />
      <circle cx="50" cy="38" r="9" fill="#dceeff" />
    </>
  ),
  coin: (
    <>
      <circle cx="50" cy="50" r="43" fill="#ffd731" />
      <circle cx="50" cy="50" r="31" fill="none" />
      <path d="M50 30 L55 45 L70 50 L55 55 L50 70 L45 55 L30 50 L45 45 Z" fill="#fff" />
    </>
  ),
  check: (
    <>
      <rect x="7" y="7" width="86" height="86" rx="22" fill="#55db9c" />
      <path className="tick" d="M28 52 L44 67 L73 35" pathLength={1} fill="none" strokeWidth="8" />
    </>
  ),
  wallet: (
    <>
      <rect className="peek" x="22" y="12" width="48" height="24" rx="6" fill="#ffd731" />
      <rect x="9" y="24" width="82" height="60" rx="14" fill="#5c4ade" />
      <rect x="58" y="43" width="33" height="22" rx="9" fill="#e9ccff" />
      <circle cx="70" cy="54" r="3.5" fill="#000" />
    </>
  ),
  code: (
    <>
      <rect x="7" y="14" width="86" height="72" rx="20" fill="#e9ccff" />
      <path d="M38 36 L24 50 L38 64 M62 36 L76 50 L62 64 M55 31 L45 69" fill="none" strokeWidth="6" />
    </>
  ),
  sparkle: <path d="M50 4 C54 36 64 46 96 50 C64 54 54 64 50 96 C46 64 36 54 4 50 C36 46 46 36 50 4 Z" fill="#ffd731" />,
  bolt: <path d="M57 5 L17 58 L45 58 L39 95 L83 38 L54 38 Z" fill="#fb4903" />,
  taxi: TAXI,
  // Ponte City: the hollow cylinder with the red sign on its crown.
  ponte: (
    <>
      <path d="M28 22 V86 A22 7 0 0 0 72 86 V22 Z" fill="#fff" />
      <path d="M28 52 A22 7 0 0 0 72 52 M28 64 A22 7 0 0 0 72 64 M28 76 A22 7 0 0 0 72 76" fill="none" strokeWidth="1.5" />
      <path className="sign" d="M28 26 V38 A22 7 0 0 0 72 38 V26 A22 7 0 0 1 28 26 Z" fill="#fb4903" />
      <ellipse cx="50" cy="22" rx="22" ry="7" fill="#e9e9e9" />
    </>
  ),
  // A kettle braai with boerewors on the grid.
  braai: (
    <>
      <path
        className="fire"
        d="M32 50 C26 40 34 32 36 24 C40 34 46 36 44 50 Z M48 50 C44 38 52 30 54 16 C60 30 64 40 58 50 Z M62 50 C60 42 66 38 68 30 C72 40 74 46 70 50 Z"
        fill="#ffd731"
      />
      <path d="M30 72 L22 94 M70 72 L78 94 M50 76 V94" fill="none" strokeWidth="4" />
      <rect x="28" y="41" width="44" height="9" rx="4.5" fill="#fb4903" />
      <path d="M14 50 H86 A36 26 0 0 1 14 50 Z" fill="#5c4ade" />
      <path d="M11 50 H89" fill="none" strokeWidth="4" />
    </>
  ),
  // October in Joburg: a jacaranda dropping its blossoms.
  jacaranda: (
    <>
      <circle className="petal" cx="28" cy="66" r="3" fill="#e9ccff" strokeWidth="1.5" />
      <circle className="petal" cx="72" cy="62" r="3" fill="#e9ccff" strokeWidth="1.5" />
      <circle className="petal" cx="62" cy="76" r="2.5" fill="#e9ccff" strokeWidth="1.5" />
      <path d="M46 94 L48 64 L40 54 L44 51 L50 58 L57 48 L61 51 L53 63 L55 94 Z" fill="#000" />
      <g className="canopy">
        <circle cx="31" cy="44" r="17" fill="#e9ccff" />
        <circle cx="67" cy="42" r="18" fill="#e9ccff" />
        <circle cx="49" cy="28" r="20" fill="#5c4ade" />
      </g>
    </>
  ),
  // The Pomodoro clock's red mug, steaming.
  mug: (
    <>
      <path className="steam" d="M36 24 C32 17 40 13 36 5 M50 22 C46 15 54 11 50 3 M64 24 C60 17 68 13 64 5" fill="none" strokeWidth="3" />
      <path d="M70 42 H76 A14 14 0 0 1 76 70 H70 V63 H76 A7 7 0 0 0 76 49 H70 Z" fill="#fb4903" />
      <path d="M22 32 H76 L71 87 Q70 94 63 94 H35 Q28 94 27 87 Z" fill="#fb4903" />
      <ellipse cx="49" cy="32" rx="27" ry="6" fill="#000" />
    </>
  ),
  // A console window with a blinking cursor.
  terminal: (
    <>
      <rect x="6" y="14" width="88" height="74" rx="14" fill="#5c4ade" />
      <circle cx="18" cy="23" r="3" fill="#fff" />
      <circle cx="27" cy="23" r="3" fill="#fff" />
      <circle cx="36" cy="23" r="3" fill="#fff" />
      <rect x="12" y="31" width="76" height="51" rx="7" fill="#000" />
      <path d="M21 46 L29 52 L21 58" fill="none" stroke="#55db9c" strokeWidth="4" />
      <rect className="cursor" x="34" y="54" width="14" height="5" fill="#55db9c" stroke="none" />
      <path d="M21 70 H62" fill="none" stroke="#e9ccff" strokeWidth="3" />
    </>
  ),
  // A browser window whose cards tilt, like the hover cards on the first site.
  browser: (
    <>
      <rect x="6" y="12" width="88" height="76" rx="14" fill="#fff" />
      <path d="M6 30 H94" fill="none" />
      <circle cx="17" cy="21" r="3" fill="#fb4903" />
      <circle cx="26" cy="21" r="3" fill="#ffd731" />
      <circle cx="35" cy="21" r="3" fill="#55db9c" />
      <rect x="14" y="37" width="46" height="9" rx="3" fill="#ffd731" />
      <rect className="tile" x="14" y="53" width="20" height="27" rx="4" fill="#dceeff" />
      <rect className="tile" x="40" y="53" width="20" height="27" rx="4" fill="#e9ccff" />
      <rect className="tile" x="66" y="53" width="20" height="27" rx="4" fill="#55db9c" />
    </>
  ),
};

export function Sticker({ kind, style }: { kind: StickerKind; style?: StickerStyle }) {
  return (
    <svg className="sticker" data-kind={kind} viewBox="0 0 100 100" style={style} aria-hidden="true">
      <g stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {STICKERS[kind]}
      </g>
    </svg>
  );
}

// A speech-bubble sticker for local slang.
export function Bubble({
  text,
  fill,
  lang,
  style,
}: {
  text: string;
  fill: 'mint' | 'sunburst' | 'ember' | 'lavender' | 'violet';
  lang?: string;
  style?: StickerStyle;
}) {
  return (
    <span className={`sticker bubble fill-${fill}`} data-kind="bubble" style={style} aria-hidden="true">
      <span className="bubble-text" lang={lang}>
        {text}
      </span>
    </span>
  );
}

// Joburg skyline: Hillbrow Tower, Ponte City, the CBD blocks and jacarandas, with a taxi on the road.
const GROUND = 200;
const BUILDINGS: [x: number, w: number, h: number, fill: string][] = [
  [0, 70, 90, '#e9ccff'],
  [64, 50, 130, '#fff'],
  [108, 80, 70, '#ffd731'],
  [180, 56, 150, '#55db9c'],
  [230, 90, 100, '#fff'],
  [400, 60, 120, '#e9ccff'],
  [455, 74, 160, '#fff'],
  [524, 50, 95, '#fb4903'],
  [570, 90, 135, '#ffd731'],
  [655, 60, 80, '#fff'],
  [860, 70, 110, '#55db9c'],
  [925, 54, 175, '#fff'],
  [975, 86, 90, '#e9ccff'],
  [1055, 60, 140, '#ffd731'],
  [1110, 80, 105, '#fff'],
  [1185, 50, 155, '#e9ccff'],
  [1230, 90, 85, '#55db9c'],
  [1315, 60, 125, '#fff'],
  [1370, 80, 95, '#ffd731'],
];
const TREES = [130, 615, 1010, 1300];

function windows(x: number, w: number, h: number, seed: number) {
  const cols = Math.floor((w - 16) / 14);
  const rows = Math.floor((h - 24) / 20);
  const out: JSX.Element[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lit = (seed * 7 + r * 3 + c * 5) % 7 === 0;
      out.push(
        <rect
          key={`${r}-${c}`}
          className={lit ? 'win lit' : 'win'}
          x={x + 10 + c * 14}
          y={GROUND - h + 12 + r * 20}
          width="6"
          height="9"
          fill={lit ? '#ffd731' : '#dceeff'}
        />,
      );
    }
  }
  return out;
}

export function Skyline() {
  return (
    <svg className="skyline" viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g stroke="#000" strokeWidth="2" strokeLinejoin="round">
        {/* Hillbrow Tower */}
        <path d="M360 30 V4" fill="none" />
        <circle className="beacon" cx="360" cy="5" r="4" fill="#fb4903" />
        <rect x="352" y="30" width="16" height={GROUND - 30} fill="#fff" />
        <rect x="336" y="50" width="48" height="22" rx="8" fill="#e9ccff" />
        <rect x="342" y="78" width="36" height="14" rx="6" fill="#fff" />

        {BUILDINGS.map(([x, w, h, fill], i) => (
          <g key={x}>
            <rect x={x} y={GROUND - h} width={w} height={h} fill={fill} />
            <g stroke="none">{windows(x, w, h, i)}</g>
          </g>
        ))}

        {/* Ponte City */}
        <path d="M744 40 V200 H836 V40 Z" fill="#fff" />
        <path
          d="M744 92 A46 12 0 0 0 836 92 M744 116 A46 12 0 0 0 836 116 M744 140 A46 12 0 0 0 836 140 M744 164 A46 12 0 0 0 836 164"
          fill="none"
          strokeWidth="1.5"
        />
        <path className="sign" d="M744 46 V70 A46 12 0 0 0 836 70 V46 A46 12 0 0 1 744 46 Z" fill="#fb4903" />
        <ellipse cx="790" cy="40" rx="46" ry="12" fill="#e9e9e9" />

        {TREES.map((x) => (
          <g key={x} className="tree">
            <path d={`M${x - 4} ${GROUND} L${x - 2} ${GROUND - 34} L${x + 2} ${GROUND - 34} L${x + 4} ${GROUND} Z`} fill="#000" />
            <circle cx={x - 16} cy={GROUND - 42} r="16" fill="#e9ccff" />
            <circle cx={x + 16} cy={GROUND - 44} r="17" fill="#e9ccff" />
            <circle cx={x} cy={GROUND - 58} r="18" fill="#5c4ade" />
          </g>
        ))}

        <rect x="0" y={GROUND} width="1440" height="40" fill="#000" />
        <path d={`M0 ${GROUND + 20} H1440`} stroke="#fff" strokeWidth="3" strokeDasharray="24 18" />

        <g className="skyline-taxi">
          <g transform={`translate(0 ${GROUND + 22 - 81 * 0.6}) scale(0.6)`} strokeWidth="3.5" strokeLinecap="round">
            {TAXI}
          </g>
        </g>
      </g>
    </svg>
  );
}
