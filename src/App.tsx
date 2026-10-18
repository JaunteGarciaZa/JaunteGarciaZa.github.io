import { useId, useState } from 'react';
import { Bubble, Skyline, Sticker } from './art';
import github from './data/github.json';
import {
  capabilities,
  journey,
  person,
  products,
  projectNotes,
  projectOrder,
  stats,
  type Product,
  type ProjectNote,
} from './data/profile';
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

type Repo = (typeof github.repos)[number];
const isRelease = (url: string) => url.includes('/releases');
// Written-up repos in their chosen order, then anything new from GitHub.
const rank = (name: string) => (projectOrder.includes(name) ? projectOrder.indexOf(name) : projectOrder.length);
const projects = [...github.repos].sort((a, b) => rank(a.name) - rank(b.name));

const NAV = [
  { href: '#wios', label: 'WIOS' },
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#projects', label: 'Projects' },
  { href: '#journey', label: 'Journey' },
];

// Greetings in isiZulu, South African English and Afrikaans, between the news.
const MARQUEE: { text: string; lang?: string }[] = [
  { text: 'Sawubona!', lang: 'zu' },
  { text: 'Open to full-stack & Java roles' },
  { text: 'Howzit!', lang: 'en-ZA' },
  { text: 'Building WIOS in Jozi' },
  { text: 'Junior tester at Healthbridge' },
  { text: 'Goeie dag!', lang: 'af' },
  { text: 'AI dev crew on Claude Code' },
  { text: 'Sanibonani!', lang: 'zu' },
  { text: 'React · Express · Postgres' },
  { text: 'Hello!' },
  { text: 'Made in Johannesburg, South Africa' },
];

// The hero bubble cycles through these.
const GREETINGS = ['Sawubona!', 'Howzit!', 'Goeie dag!', 'Sanibonani!', 'Hello!'];

export default function App() {
  useMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [first, ...rest] = person.name.split(' ');
  const last = rest[rest.length - 1];

  return (
    <>
      <div className="marquee" aria-label={MARQUEE.map((m) => m.text).join(' · ')}>
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {MARQUEE.map((m, i) => (
                <span key={m.text} lang={m.lang}>
                  {m.text} <b className={`star-${i % 4}`}>✦</b>{' '}
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
            <div className="hero-top">
              <span className="bubble greet fill-sunburst" aria-hidden="true">
                <span className="bubble-text" data-greet={GREETINGS.join('|')}>
                  {GREETINGS[0]}
                </span>
              </span>
              <p className="label">
                {person.role} · {person.location}
              </p>
            </div>
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
              <Bubble text="Lekker!" lang="af" fill="mint" style={{ top: '18%', left: 'min(72vw, 1060px)', rotate: '-8deg' }} />
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
              <Sticker kind="jacaranda" style={{ bottom: '0', left: 'min(66vw, 940px)', rotate: '6deg', '--s': 'clamp(72px, 12vw, 170px)' }} />
            </div>
            <p className="tagline">Everything public on my GitHub, from my first landing page to the site you’re on.</p>
            <div className="projects">
              {projects.map((r) => (
                <ProjectCard key={r.name} repo={r} />
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="band white">
          <div className="wrap">
            <div className="poster heading">
              <h2 className="display" data-split>Journey</h2>
              <Sticker kind="rocket" style={{ top: '-4%', left: 'min(70vw, 1000px)', rotate: '32deg' }} />
              <Sticker kind="ponte" style={{ top: '-18%', left: 'min(82vw, 1200px)', rotate: '-6deg', '--s': 'clamp(60px, 10vw, 140px)' }} />
              <Bubble text="Eish!" fill="ember" style={{ bottom: '-12%', left: 'min(40vw, 560px)', rotate: '7deg' }} />
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
                <Bubble text="Sharp sharp!" fill="sunburst" style={{ top: '-6%', left: 'min(40vw, 480px)', rotate: '8deg' }} />
                <Sticker kind="braai" style={{ bottom: '-4%', left: 'min(32vw, 420px)', rotate: '-10deg', '--s': 'clamp(52px, 7vw, 100px)' }} />
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
          <Skyline />
        </section>
      </main>

      <footer className="foot">
        <span>
          © {new Date().getFullYear()} {person.name}
        </span>
        <span>Made in Jozi, South Africa · Built with React and Vite</span>
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

function ProjectCard({ repo }: { repo: Repo }) {
  const note: ProjectNote | undefined = projectNotes[repo.name];
  const title = note?.title ?? repo.name.replace(/[-_]/g, ' ');
  return (
    <article className={note?.featured ? 'card project featured' : 'card project'}>
      <ProjectArt art={note?.art} />
      <div className="project-main">
        <span className="chip" style={{ background: (repo.language && LANG_COLOR[repo.language]) || 'var(--color-soft-mist)' }}>
          {note?.kind ?? repo.language ?? 'Repository'}
        </span>
        <h3>{title}</h3>
        <p className="project-tagline">{note?.tagline ?? repo.description ?? 'No description yet.'}</p>
      </div>
      {note && (
        <div className="project-detail">
          <ul className="highlights">
            {note.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <ul className="tags">
            {note.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="project-links">
        <a className="btn filled" href={repo.url} target="_blank" rel="noreferrer" aria-label={`${title}: code on GitHub`}>
          Code ↗
        </a>
        {note?.featured ? (
          <span className="chip fill-mint">You’re looking at it</span>
        ) : (
          repo.homepage && (
            <a className="btn" href={repo.homepage} target="_blank" rel="noreferrer" aria-label={`${title}: ${isRelease(repo.homepage) ? 'download' : 'live site'}`}>
              {isRelease(repo.homepage) ? 'Download ↗' : 'Live ↗'}
            </a>
          )
        )}
        <span className="repo-meta">Updated {monthYear(repo.pushedAt)}</span>
      </div>
    </article>
  );
}

function ProjectArt({ art }: { art?: ProjectNote['art'] }) {
  if (!art) return null;
  if (art === 'collage') {
    return (
      <>
        <Sticker kind="code" style={{ top: '-34px', right: '120px', rotate: '-10deg', '--s': '76px' }} />
        <Sticker kind="ponte" style={{ top: '-46px', right: '40px', rotate: '8deg', '--s': '88px' }} />
        <Sticker kind="sparkle" style={{ top: '-22px', right: '8px', rotate: '12deg', '--s': '44px' }} />
      </>
    );
  }
  return <Sticker kind={art} style={{ top: '-34px', right: '20px', rotate: art === 'mug' ? '8deg' : '-8deg', '--s': '80px' }} />;
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

// The inflated tube: a black outline, a flat blue body with flat shade and highlight bands, a travelling glint, and film grain.
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
        <path
          {...tube}
          className="glint"
          stroke="#fff"
          strokeWidth={width * 0.1}
          strokeDasharray="0.06 0.94"
          transform={`translate(0 ${-width * 0.22})`}
        />
        <rect width="1200" height={height} filter={`url(#grain-${id})`} opacity="0.3" style={{ mixBlendMode: 'multiply' }} />
      </g>
    </svg>
  );
}
