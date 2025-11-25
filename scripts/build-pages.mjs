import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const docsDir = join(process.cwd(), 'docs');
const preserve = new Set(['manual']);

// Clean previous build artifacts but keep handbook/manual content if present.
readdirSync(docsDir).forEach((entry) => {
  if (preserve.has(entry)) return;
  const target = join(docsDir, entry);
  const stats = statSync(target);
  if (stats.isDirectory()) {
    rmSync(target, { recursive: true, force: true });
  } else {
    rmSync(target, { force: true });
  }
});

// Build the site directly into docs/ so GitHub Pages "Deploy from /docs" works without Actions.
execSync('npx vite build --outDir docs', { stdio: 'inherit' });

// Ensure 404.html exists for SPA fallback on GitHub Pages.
const indexPath = join(docsDir, 'index.html');
const fallbackPath = join(docsDir, '404.html');
const noJekyllPath = join(docsDir, '.nojekyll');
if (existsSync(indexPath)) {
  copyFileSync(indexPath, fallbackPath);
  console.log('Created 404.html for SPA routing.');
} else {
  console.warn('index.html missing after build; skipping 404.html copy.');
}

// Disable Jekyll processing so asset paths are served as-is.
writeFileSync(noJekyllPath, '');
console.log('Added .nojekyll to bypass Jekyll processing.');
