# College Finder Nepal

Find the right college, course, and future in Nepal.

A small React + TypeScript MVP for searching, comparing and saving colleges and courses.
All data is static **demo data** stored in `src/data/`. There is no backend, database or login.
Saved colleges are kept in the browser's `localStorage`.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

The app runs at http://localhost:8080

## Build

```bash
npm run build
```

The static output is written to `dist/`.

## Deploy to GitHub Pages

1. Push the project to a GitHub repository.
2. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml` installs
   dependencies, builds the app, uploads the build output as a Pages artifact and deploys it.
4. The site becomes available at `https://<username>.github.io/<repository>/`.

If the site is served from a subfolder (`/<repository>/`), set the base path before building
or publish the repository as `<username>.github.io` so the site is served from the root.

## Data

- `src/data/colleges.ts` — demo colleges
- `src/data/courses.ts` — demo courses

All values are unverified sample data for demonstration only.
