const args = process.argv.slice(2);
const params = {};
for (let i = 0; i < args.length; i += 2) {
  const key = args[i]?.replace(/^--/, '');
  const value = args[i + 1];
  if (key) params[key] = value;
}

const token = process.env.GITHUB_TOKEN;
const repoInput = params.repo ?? process.env.GITHUB_REPOSITORY;
const workflowFile = params.workflow ?? 'deploy.yml';
const ref = params.ref ?? 'main';

if (!token) {
  console.error('Missing GITHUB_TOKEN; export a repo-scoped token before running.');
  process.exit(1);
}

if (!repoInput || !repoInput.includes('/')) {
  console.error('Missing repo. Provide --repo owner/name or set GITHUB_REPOSITORY.');
  process.exit(1);
}

const [owner, repo] = repoInput.split('/', 2);

const dispatchUrl = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowFile}/dispatches`;

const response = await fetch(dispatchUrl, {
  method: 'POST',
  headers: {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28'
  },
  body: JSON.stringify({ ref })
});

if (!response.ok) {
  const message = await response.text();
  console.error(`Dispatch failed (${response.status}): ${message}`);
  process.exit(1);
}

console.log(`Triggered workflow ${workflowFile} on ${repoInput} at ${ref}.`);
