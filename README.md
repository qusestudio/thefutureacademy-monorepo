# The Future Academy — Monorepo

A production monorepo for **The Future Academy SA**, built with [Turborepo](https://turbo.build/repo) and [shadcn/ui](https://ui.shadcn.com/). All apps and shared packages live in a single repository, with orchestrated builds, linting, formatting, and type-checking across the workspace.

---

## What's Inside

### Apps (`apps/`)

| App | Description |
|-----|-------------|
| `web` | Main Next.js web application |

### Packages (`packages/`)

| Package | Description |
|---------|-------------|
| `@workspace/ui` | Shared component library powered by shadcn/ui |
| `@workspace/eslint-config` | Shared ESLint configuration used across all apps and packages |
| `@workspace/typescript-config` | Shared `tsconfig.json` bases used throughout the monorepo |

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build System**: [Turborepo](https://turbo.build/repo)
- **Language**: TypeScript
- **Package Manager**: npm (workspaces)
- **Linting**: ESLint
- **Formatting**: Prettier + `prettier-plugin-tailwindcss`

---

## Getting Started

### Prerequisites

- Node.js `>=20`
- npm `>=10.9.2`

### Installation

```bash
git clone https://github.com/thefutureacademysa/thefutureacademy-monorepo.git
cd thefutureacademy-monorepo
npm install
```

### Development

Start all apps and packages in development mode:

```bash
npm run dev
```

To run a specific app only:

```bash
npm run dev --workspace=apps/web
```

---

## Available Scripts

All scripts are run from the **root** of the monorepo and orchestrated via Turborepo.

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in development mode |
| `npm run build` | Build all apps and packages |
| `npm run lint` | Run ESLint across the entire workspace |
| `npm run format` | Run Prettier across the entire workspace |
| `npm run typecheck` | Run TypeScript type checking across the workspace |

---

## Adding shadcn/ui Components

Components are installed at the app level and automatically placed into `packages/ui/src/components`.

```bash
# From the repo root, targeting the web app
npx shadcn@latest add button -c apps/web
```

### Using Components

Import shared components from the `@workspace/ui` package:

```tsx
import { Button } from "@workspace/ui/components/button";
```

---

## Monorepo Structure

```
thefutureacademy-monorepo/
├── apps/
│   └── web/                  # Main Next.js application
├── packages/
│   ├── ui/                   # Shared shadcn/ui component library
│   ├── eslint-config/        # Shared ESLint config
│   └── typescript-config/    # Shared TypeScript config
├── .eslintrc.js
├── .prettierrc
├── turbo.json                # Turborepo pipeline configuration
├── package.json              # Root workspace config
└── tsconfig.json
```

---

## Turborepo Pipeline

The `turbo.json` defines the following task pipeline:

- **`build`** — depends on upstream `build` tasks; outputs `.next/**` (excluding cache)
- **`lint`** — depends on upstream `lint` tasks
- **`format`** — depends on upstream `format` tasks
- **`typecheck`** — depends on upstream `typecheck` tasks
- **`dev`** — persistent, not cached; runs all dev servers concurrently

Turborepo caches task outputs automatically. Re-running a task with no changes will be near-instant.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes and ensure all checks pass:
   ```bash
   npm run lint && npm run typecheck && npm run build
   ```
4. Submit a pull request

---

## License

Private — © The Future Academy SA. All rights reserved.
