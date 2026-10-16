import { useEffect, useState } from 'react';
import github from './data/github.json';
import { capabilities, journey, person, products, stats, type Product } from './data/profile';

const LANG_COLOR: Record<string, string> = { Java: '#b07219', HTML: '#e34c26', TypeScript: '#3178c6', JavaScript: '#f1e05a' };
const monthYear = (iso: string) => new Date(iso).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' });

type Theme = 'light' | 'dark';

function useTheme(): [Theme | null, () => void] {
  const [theme, setTheme] = useState<Theme | null>(() => {
    try {
      return (localStorage.getItem('theme') as Theme | null) ?? null;
    } catch {
      return null;
    }
  });
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
    else delete document.documentElement.dataset.theme;
  }, [theme]);
  const toggle = () => {
    const current = theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private window: the choice lasts this visit */
    }
  };
  return [theme, toggle];
}

export default function App() {
  const [, toggleTheme] = useTheme();
  return (
    <>
      <header className="nav">
        <a className="brand" href="#top">
          JKG
        </a>
        <nav>
          <a href="#wios">WIOS</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#projects">Projects</a>
          <a href="#journey">Journey</a>
          <button className="theme" onClick={toggleTheme} aria-label="Switch light or dark theme">
            ◐
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <p className="eyebrow">
            {person.role} · {person.location}
          </p>
          <h1>{person.name}</h1>
          <p className="lede">{person.intro}</p>
          <div className="cta">
            <a className="btn primary" href="#wios">
              See WIOS
            </a>
            <a className="btn" href={person.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="wios" className="wrap">
          <h2>WIOS</h2>
          <p className="section-lede">
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
        </section>

        <section id="capabilities" className="wrap">
          <h2>Capabilities</h2>
          <div className="caps">
            {capabilities.map((c) => (
              <div key={c.area} className="cap">
                <h3>{c.area}</h3>
                <ul className="tags">
                  {c.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="wrap">
          <h2>Open-source projects</h2>
          <p className="section-lede">Public work from the Java track, pulled from GitHub.</p>
          <div className="repos">
            {github.repos.map((r) => (
              <a key={r.name} className="repo" href={r.url} target="_blank" rel="noreferrer">
                <h3>{r.name.replace(/[-_]/g, ' ')}</h3>
                <p>{r.description ?? 'No description yet.'}</p>
                <span className="repo-meta">
                  {r.language && (
                    <span>
                      <i style={{ background: LANG_COLOR[r.language] ?? 'var(--muted)' }} />
                      {r.language}
                    </span>
                  )}
                  <span>Updated {monthYear(r.pushedAt)}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="journey" className="wrap">
          <h2>Journey</h2>
          <ol className="timeline">
            {journey.map((j) => (
              <li key={j.title}>
                <span className="when">{j.when}</span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap contact">
          <h2>Let’s talk</h2>
          <p className="section-lede">Open to full-stack and Java roles, and to conversations about learning technology.</p>
          <div className="cta">
            <a className="btn primary" href={person.github} target="_blank" rel="noreferrer">
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
        </section>
      </main>

      <footer className="wrap foot">
        © {new Date().getFullYear()} {person.name} · Built with React and Vite
      </footer>
    </>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <article className={`product ${p.key}`}>
      <p className="kind">{p.kind}</p>
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
