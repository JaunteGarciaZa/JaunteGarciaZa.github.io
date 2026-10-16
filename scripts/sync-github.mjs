// Pulls the public profile and public repos into src/data/github.json, so the
// site builds without calling GitHub from the browser. Run: pnpm sync:github
import { writeFile } from 'node:fs/promises';

const USER = process.env.GITHUB_USER ?? 'JaunteGarciaZa';
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-sync' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function get(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
  return res.json();
}

const profile = await get(`/users/${USER}`);
const repos = await get(`/users/${USER}/repos?per_page=100&sort=pushed`);

const data = {
  syncedAt: new Date().toISOString(),
  profile: {
    login: profile.login,
    name: profile.name,
    bio: profile.bio,
    location: profile.location,
    url: profile.html_url,
    avatar: profile.avatar_url,
    joined: profile.created_at,
    publicRepos: profile.public_repos,
  },
  repos: repos
    .filter((r) => !r.fork && !r.archived && r.name !== USER)
    .map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      url: r.html_url,
      homepage: r.homepage || null,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      topics: r.topics ?? [],
    })),
};

await writeFile(new URL('../src/data/github.json', import.meta.url), JSON.stringify(data, null, 2) + '\n');
console.log(`Synced ${data.repos.length} public repos for ${USER}.`);
