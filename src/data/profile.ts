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
