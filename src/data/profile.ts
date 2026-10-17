// Hand-written content. Public repos come from github.json (pnpm sync:github).
// The WIOS repos are private: describe what they do, never their code or secrets.

export const person = {
  name: 'Jaunte Kelvin Garcia',
  role: 'Full-stack developer',
  location: 'Johannesburg, South Africa',
  intro:
    'I build WIOS: a multi-tenant learning platform, the analytics service behind it, and an AI dev crew that helps ship both. Java developer in training at VZAP, working full-stack in TypeScript.',
  github: 'https://github.com/JaunteGarciaZa',
  // Add a public contact address or LinkedIn here when you want one on the site.
  email: null as string | null,
  linkedin: null as string | null,
};

export const stats = [
  { value: '3', label: 'products in the WIOS platform' },
  { value: '650+', label: 'commits across them' },
  { value: '6', label: 'AI agents in the dev crew' },
  { value: '3', label: 'languages shipped: English, Afrikaans, isiZulu' },
];

export type Product = {
  key: string;
  name: string;
  kind: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const products: Product[] = [
  {
    key: 'learn',
    name: 'WIOS Learn',
    kind: 'Multi-tenant LMS · SaaS',
    summary:
      'A white-label learning platform: each school or company gets its own branded tenant, courses, payments and AI tutor, isolated down to the query.',
    highlights: [
      'Visual course builder: a drag-and-drop module graph with phases, dependencies and definitions of done',
      'Video upload to HLS transcoding through a queue of FFmpeg workers',
      'Quizzes, rubric-graded assignments, peer review, and labs that run Java, .NET, Python and JavaScript in a sandbox',
      'AI tutor, grader and content generator on Gemini (Vertex AI), streamed over SSE with per-tier rate limits and usage billing',
      'Stripe and PayFast checkout, SAML/OIDC single sign-on, SCIM provisioning, SCORM and LTI 1.3',
      'Tenant isolation enforced at runtime: a query on a tenant table without a tenant filter throws',
    ],
    stack: ['React', 'Vite', 'TanStack Router', 'Express', 'Drizzle', 'Postgres', 'Redis', 'BullMQ', 'Socket.IO', 'Meilisearch', 'GCP Cloud Run'],
  },
  {
    key: 'analytics',
    name: 'WIOS Analytics',
    kind: 'Learning analytics · xAPI',
    summary:
      'A standalone analytics service. Any LMS that speaks xAPI pushes learning events to it; it stores them and turns them into dashboards for each organisation.',
    highlights: [
      'An LRS-lite ingestion API: single or batched xAPI statements, idempotent on statement id',
      'Per-source credentials minted and revoked from the dashboard, shown once and stored hashed',
      'Catalog sync keeps each LMS’s course list current; Moodle and Canvas connectors run it on a schedule',
      'Role-based dashboards (owner, admin, viewer) with revocable sessions',
    ],
    stack: ['React', 'Express', 'Drizzle', 'MySQL', 'xAPI', 'Docker'],
  },
  {
    key: 'console',
    name: 'WIOS Console',
    kind: 'Operator console · AI dev hub',
    summary:
      'The control room: every tenant and org across both products, one roadmap, and a crew of six AI agents that take tickets from spec to pull request.',
    highlights: [
      'Six Claude agents (manager, spec, scope, QA, build, review) run headless in their own git worktrees, under a budget, with a live feed',
      'Say “start” and it drafts tickets from the roadmap, checks they are crew work, and moves the rest with a note',
      'Pauses at the account usage limit and resumes the same session when it resets',
      'Lean sessions halve the context each request carries; tokens and cost are tracked per run',
      'Read-only at the database and bound to loopback, so it can look at production data without touching it',
    ],
    stack: ['React', 'React Query', 'Express', 'Claude Code', 'Git worktrees', 'GitHub CLI', 'Vitest'],
  },
];

export const capabilities: { area: string; items: string[] }[] = [
  { area: 'Languages', items: ['TypeScript', 'Java', 'SQL', 'HTML & CSS'] },
  { area: 'Frontend', items: ['React', 'Vite', 'TanStack Router & Query', 'i18next', 'JavaFX'] },
  { area: 'Backend', items: ['Node.js', 'Express', 'Drizzle ORM', 'Postgres', 'MySQL', 'Redis', 'BullMQ', 'Socket.IO'] },
  { area: 'Cloud & delivery', items: ['GCP Cloud Run', 'Docker Compose', 'GitHub Actions CI', 'S3 / MinIO', 'pnpm monorepos'] },
  { area: 'AI', items: ['Gemini on Vertex AI', 'Claude Code agents', 'SSE streaming', 'Token & cost budgeting'] },
  { area: 'Standards', items: ['xAPI', 'SCORM', 'LTI 1.3', 'SAML / OIDC', 'SCIM 2.0', 'Stripe & PayFast'] },
];

export const journey: { when: string; title: string; text: string }[] = [
  { when: 'Apr 2025', title: 'Started on GitHub', text: 'Began training as a Java developer at VZAP.' },
  { when: 'Early 2026', title: 'Java fundamentals', text: 'A student grade calculator, a folder-copying tool, a JavaFX Pomodoro timer and a group project.' },
  { when: 'Apr 2026', title: 'First website, then WIOS Learn', text: 'Shipped a first HTML site, then started the LMS that became the core of WIOS.' },
  { when: 'Jul 2026', title: 'WIOS Analytics', text: 'Split learning analytics into its own xAPI service so any LMS can use it.' },
  { when: 'Oct 2026', title: 'WIOS Console and the dev crew', text: 'Built the operator console and an AI crew that turns roadmap items into pull requests.' },
];

// Write-ups for the public repos, keyed by repo name. Every claim here is in the repo's code.
// Repos without an entry still show, with their GitHub description.
export type ProjectNote = {
  title: string;
  kind: string;
  tagline: string;
  highlights: string[];
  stack: string[];
  art: 'mug' | 'terminal' | 'browser' | 'collage';
  featured?: boolean;
};

export const projectNotes: Record<string, ProjectNote> = {
  'JaunteGarciaZa.github.io': {
    title: 'This portfolio',
    kind: 'Web · React + TypeScript',
    tagline:
      'The site you’re on: a sticker-book design system built from scratch, animated end to end, and deployed by CI on every push.',
    highlights: [
      'Every sticker, ribbon and the Joburg skyline is hand-built SVG: no image files, no icon packs',
      'GSAP ScrollTrigger and SplitText choreography on Lenis smooth scroll, plus an idle loop for every sticker',
      'Respects reduced motion with a plain static page, and idle loops only run while they’re on screen',
      'GitHub data is synced at build time, then GitHub Actions builds and publishes to Pages',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'GSAP', 'Lenis', 'SVG', 'GitHub Actions'],
    art: 'collage',
    featured: true,
  },
  'JAVA-Pomodoro-timer': {
    title: 'Lo-fi Pomodoro Clock',
    kind: 'Desktop app · JavaFX',
    tagline: 'A focus timer where a hand-drawn coffee mug fills as you work and drains while you rest.',
    highlights: [
      'The timer is a state machine (work, short break ×4, long break) ticking on a JavaFX Timeline',
      'The mug is painted on a Canvas every frame: coffee level follows progress, with waves, steam and a flash on each change',
      'Chimes are synthesised from sine-wave partials in code (no audio files), played on a daemon thread so the UI never stalls',
      'Built by GitHub Actions into a fat JAR you can download from Releases, or wrap as a Windows .exe with Launch4j',
    ],
    stack: ['Java 17', 'JavaFX 21', 'Maven', 'Launch4j', 'javax.sound'],
    art: 'mug',
  },
  JavaStudentGradeCalculator: {
    title: 'Academic Management CLI',
    kind: 'Console app · Java',
    tagline: 'Registers students, validates their marks and prints a class report, without crashing on bad input.',
    highlights: [
      'A small domain model (Student, Lecturer, SchoolClass) with the grading rules behind a GradeCalculator interface',
      'Averages computed with streams and banded into Distinction, Pass or Fail',
      'Text where a number belongs, or a mark outside 0–100, is caught and explained; the menu keeps running',
      'Modern Java 25 (switch expressions, an instance main method), compiled and smoke-tested by CI on every push',
    ],
    stack: ['Java', 'OOP', 'Streams', 'Interfaces'],
    art: 'terminal',
  },
  MyFirstWebsite: {
    title: 'First landing page',
    kind: 'Web · HTML + Tailwind',
    tagline: 'Where the web side started: a landing page, now live, with its cards rendered from data.',
    highlights: [
      'Semantic HTML5 sections: header, hero, a skills section, a note and a contact form with native validation',
      'Cards generated from a JavaScript array with map(), with a disabled “Coming soon” state',
      'Styled with Tailwind utilities and hover transitions; a login toggle and form note wired with DOM events',
    ],
    stack: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    art: 'browser',
  },
};

// Featured first, then the strongest work.
export const projectOrder = ['JaunteGarciaZa.github.io', 'JAVA-Pomodoro-timer', 'JavaStudentGradeCalculator', 'MyFirstWebsite'];
