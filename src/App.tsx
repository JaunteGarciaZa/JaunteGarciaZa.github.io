import { useId, useState, type CSSProperties } from 'react';
import github from './data/github.json';
import { capabilities, journey, person, products, stats, type Product } from './data/profile';
import { useMotion } from './motion';

// Languages take a sticker colour rather than GitHub's own palette.
const LANG_COLOR: Record<string, string> = {
  Java: 'var(--color-ember)',
  HTML: 'var(--color-sunburst)',
  TypeScript: 'var(--color-electric-blue)',
  JavaScript: 'var(--color-sunburst)',
};
const STICKER_FILLS = ['blue', 'mint', 'lavender', 'sunburst', 'ember', 'violet'] as const;
const monthYear = (iso: string) => new Date(iso).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' });

const NAV = [
  { href: '#wios', label: 'WIOS' },
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#projects', label: 'Projects' },
  { href: '#journey', label: 'Journey' },
];

const MARQUEE = ['Open to full-stack & Java roles', 'Building WIOS', 'Johannesburg, South Africa', 'React · Express · Postgres', 'AI dev crew on Claude Code'];

export default function App() {
  useMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [first, ...rest] = person.name.split(' ');
  const last = rest[rest.length - 1];

  return (
    <>
      <div className="marquee" aria-label={MARQUEE.join(' · ')}>
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {MARQUEE.map((m) => (
                <span key={m}>
                  {m} <b>✦</b>{' '}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <header className="nav">
        <a className="logo" href="#top" aria-label={`${person.name}, back to top`}>
          JG
        </a>
        <nav className={menuOpen ? 'pills open' : 'pills'} id="site-nav">
          {NAV.map((n) => (
            <a key={n.href} className="pill" href={n.href} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav-end">
          <a className="btn filled" href="#contact">
            Let’s talk
          </a>
          <button
            className="plus"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? '×' : '+'}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="band sky hero">
          <div className="wrap">
            <p className="label">
              {person.role} · {person.location}
            </p>
            <div className="poster">
              <Ribbon d="M -80 440 C 160 110 420 50 560 270 S 820 540 1000 330 S 1220 70 1300 140" width={120} />
              <h1 className="display xl">
                <span className="sr-only">{person.name}</span>
                <span aria-hidden="true" data-split>
                  {first}
                  <br />
                  {last}
                </span>
              </h1>
              <Sticker kind="rocket" style={{ top: '-6%', right: '6%', rotate: '18deg', '--s': 'clamp(64px, 11vw, 150px)' }} />
              <Sticker kind="coin" style={{ bottom: '4%', left: '46%', rotate: '-12deg', '--s': 'clamp(48px, 7vw, 100px)' }} />
              <Sticker kind="code" style={{ top: '38%', right: '-1%', rotate: '9deg', '--s': 'clamp(56px, 8vw, 116px)' }} />
            </div>
            <p className="tagline">{person.intro}</p>
            <div className="cta">
              <a className="btn filled" href="#wios">
                See WIOS
              </a>
              <a className="btn" href={person.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
            <dl className="stats">
              {stats.map((s, i) => (
                <div key={s.label} className={`card fill-${STICKER_FILLS[i % 4]}`}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="wios" className="band white">
          <div className="wrap">
            <div className="poster heading">
              <Ribbon d="M -80 20 C 220 250 540 250 780 130 S 1100 -20 1300 80" width={56} height={300} />
              <h2 className="display" data-split>WIOS</h2>
              <Sticker kind="check" style={{ top: '6%', left: 'min(52vw, 640px)', rotate: '-10deg' }} />
              <Sticker kind="wallet" style={{ bottom: '0', right: '8%', rotate: '12deg' }} />
            </div>
            <p className="tagline">
              One platform in three parts. Learn is where people learn, Analytics turns their activity into insight, and the
              Console runs the whole thing, including the AI crew that helps build it.
            </p>
            <Architecture />
            <div className="products">
              {products.map((p) => (
                <ProductCard key={p.key} p={p} />
              ))}
            </div>
            <p className="note">The WIOS source is private. I’m happy to walk through the architecture and code on a call.</p>
          </div>
        </section>

        <section id="toolkit" className="band gray">
          <div className="wrap">
            <div className="poster heading">
              <h2 className="display" data-split>Toolkit</h2>
              <Sticker kind="bolt" style={{ top: '-10%', left: 'min(62vw, 900px)', rotate: '14deg' }} />
              <Sticker kind="sparkle" style={{ bottom: '-14%', left: '-1%', rotate: '-8deg', '--s': 'clamp(36px, 5vw, 64px)' }} />
            </div>
            <div className="caps">
              {capabilities.map((c, i) => (
                <div key={c.area} className={`card fill-${STICKER_FILLS[i % STICKER_FILLS.length]}`}>
                  <h3>{c.area}</h3>
                  <ul className="tags">
                    {c.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="band sky">
          <div className="wrap">
            <div className="poster heading">
              <h2 className="display" data-split>
                Open
                <br />
                source
              </h2>
              <Sticker kind="code" style={{ top: '4%', left: 'min(46vw, 620px)', rotate: '-14deg' }} />
            </div>
            <p className="tagline">Public work from the Java track, pulled from GitHub.</p>
            <div className="repos">
              {github.repos.map((r) => (
                <a key={r.name} className="card repo" href={r.url} target="_blank" rel="noreferrer">
                  <span className="repo-top">
                    {r.language && (
                      <span className="chip" style={{ background: LANG_COLOR[r.language] ?? 'var(--color-soft-mist)' }}>
                        {r.language}
                      </span>
                    )}
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                  <h3>{r.name.replace(/[-_]/g, ' ')}</h3>
                  <p>{r.description ?? 'No description yet.'}</p>
                  <span className="repo-meta">Updated {monthYear(r.pushedAt)}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="band white">
          <div className="wrap">
            <div className="poster heading">
              <h2 className="display" data-split>Journey</h2>
              <Sticker kind="rocket" style={{ top: '-4%', left: 'min(70vw, 1000px)', rotate: '32deg' }} />
            </div>
            <ol className="timeline">
              {journey.map((j, i) => (
                <li key={j.title}>
                  <span className="step" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className={`chip fill-${STICKER_FILLS[i % STICKER_FILLS.length]}`}>{j.when}</span>
                    <h3>{j.title}</h3>
                    <p>{j.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="band blue contact">
          <div className="wrap contact-grid">
            <div>
              <div className="poster heading">
                <h2 className="display" data-split>
                  Let’s
                  <br />
                  talk
                </h2>
                <Sticker kind="sparkle" style={{ top: '-8%', left: 'min(44vw, 520px)', rotate: '10deg' }} />
                <Sticker kind="check" style={{ bottom: '-6%', left: 'min(30vw, 400px)', rotate: '-12deg', '--s': 'clamp(40px, 5vw, 70px)' }} />
              </div>
              <p className="tagline">Open to full-stack and Java roles, and to conversations about learning technology.</p>
              <div className="cta">
                <a className="btn filled" href={person.github} target="_blank" rel="noreferrer">
                  github.com/{github.profile.login}
                </a>
                {person.email && (
                  <a className="btn" href={`mailto:${person.email}`}>
                    Email
                  </a>
                )}
                {person.linkedin && (
                  <a className="btn" href={person.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
            <a className="gh-card" href={person.github} target="_blank" rel="noreferrer">
              <span className="gh-face">
                <img src={github.profile.avatar} alt="" width="120" height="120" loading="lazy" />
              </span>
              <span className="gh-label">
                Follow on
                <br />
                GitHub
              </span>
            </a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <span>
          © {new Date().getFullYear()} {person.name}
        </span>
        <span>Built with React and Vite</span>
      </footer>
    </>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <article className={`card product ${p.key}`}>
      <p className="chip light">{p.kind}</p>
      <h3>{p.name}</h3>
      <p>{p.summary}</p>
      <ul className="highlights">
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <ul className="tags">
        {p.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </article>
  );
}

function Architecture() {
  return (
    <figure className="arch" aria-label="How the WIOS products connect">
      <div className="node learn">
        <b>Learn</b>
        <span>Tenants, courses, AI tutor</span>
      </div>
      <div className="edge">
        <span>xAPI statements</span>
      </div>
      <div className="node analytics">
        <b>Analytics</b>
        <span>Events → dashboards</span>
      </div>
      <div className="node console">
        <b>Console</b>
        <span>Reads both, read-only · roadmap · AI crew</span>
      </div>
      <figcaption>The crew opens pull requests on all three repos; a person reviews and merges.</figcaption>
    </figure>
  );
}

// The inflated tube: a black outline, a flat blue body with flat shade and highlight bands, and film grain.
function Ribbon({ d, width, height = 600 }: { d: string; width: number; height?: number }) {
  const id = useId().replace(/:/g, '');
  const tube = { d, pathLength: 1, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <svg className="ribbon" viewBox={`0 0 1200 ${height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <mask id={`tube-${id}`}>
          <path {...tube} stroke="#fff" strokeWidth={width} />
        </mask>
        <filter id={`grain-${id}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <path {...tube} stroke="#000" strokeWidth={width + 5} />
      <g mask={`url(#tube-${id})`}>
        <path {...tube} stroke="#4da2ff" strokeWidth={width} />
        <path {...tube} stroke="#2f86e6" strokeWidth={width} transform={`translate(0 ${width * 0.34})`} />
        <path {...tube} stroke="#a9d3ff" strokeWidth={width * 0.2} transform={`translate(0 ${-width * 0.22})`} />
        <rect width="1200" height={height} filter={`url(#grain-${id})`} opacity="0.3" style={{ mixBlendMode: 'multiply' }} />
      </g>
    </svg>
  );
}

type StickerKind = 'rocket' | 'coin' | 'check' | 'wallet' | 'code' | 'sparkle' | 'bolt';

const STICKERS: Record<StickerKind, JSX.Element> = {
  rocket: (
    <>
      <path d="M40 72 Q50 99 60 72 Z" fill="#ffd731" />
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
      <path d="M28 52 L44 67 L73 35" fill="none" strokeWidth="8" />
    </>
  ),
  wallet: (
    <>
      <rect x="22" y="12" width="48" height="24" rx="6" fill="#ffd731" />
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
};

function Sticker({ kind, style }: { kind: StickerKind; style?: CSSProperties & { '--s'?: string } }) {
  return (
    <svg className="sticker" viewBox="0 0 100 100" style={style} aria-hidden="true">
      <g stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {STICKERS[kind]}
      </g>
    </svg>
  );
}
