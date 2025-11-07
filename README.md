# Cyanase Collective (Prototype)

A Vite + React + TypeScript + Tailwind + Recharts prototype for the Cyanase Collective dashboard.

## Local dev

```bash
npm i
npm run dev
```

Then open the local URL printed in your terminal.

## Build

```bash
npm run build
npm run preview
```

## What’s inside?

- Tabs: Overview, Wallet, Goals, Investments, Community
- Charts: portfolio allocation pie, monthly contributions bar, wallet balance line, performance line, community engagement bars
- Tailwind for styling

## Deploy / Push to GitHub

1. Create a new repo on GitHub (empty).
2. In this folder run:

```bash
git init
git add .
git commit -m "feat: cyanase-collective prototype dashboard"
git branch -M main
git remote add origin https://github.com/<YOUR_GH_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

## Notes

- Data is mocked; wire your APIs for real balances, goals, and products.
- Recharts cells intentionally have default colors (no custom palette set).
