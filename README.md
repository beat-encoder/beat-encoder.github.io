# beat-encoder.github.io

Landing page for [Beat Encoder Utilities](https://github.com/beat-encoder/beat-encoder-utilities) — the desktop toolkit for DJ libraries.

The home of Beat Encoder Utilities — organize, grade, fix and level your DJ library, all in one free app for Mac & Windows.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # tsc + vite build → dist/
pnpm preview  # preview the production build
```

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and deploys `dist/` to GitHub Pages. In the repository settings, set **Pages → Source** to **GitHub Actions**.
