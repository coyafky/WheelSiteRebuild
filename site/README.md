# WheelSite application

This directory contains the Next.js + Payload application. `/` now renders a Home implementation preview based on the [Home Page Spec](../.scratch/page-home/spec.md). It uses explicit placeholders for unapproved brand and product assets and remains `noindex, nofollow`. Product destinations, Blog, RFQ, and production content are still implementation work. Architecture and deployment boundaries are in [Project Bootstrap](../docs/02-架构/PROJECT_BOOTSTRAP.md).

Public pages use shadcn/ui (Radix) with Tailwind CSS 4. The checked-in primitives are in `src/components/ui/`, configured by `components.json`; `src/app/globals.css` maps their variables to the approved values in [`Design.md`](../Design.md). Add further primitives only when a page spec needs them, then adapt their states and sizing to the same tokens. Payload admin uses its own UI.

## Local development

Use Node.js 24.22.2 and pnpm 11.28.10 to install dependencies. From this directory:

```sh
cp .env.example .env
# Set PAYLOAD_SECRET in .env to a unique random value.
docker compose -f compose.dev.yaml up -d
pnpm install --frozen-lockfile
npm run dev
```

The app normally starts at `http://localhost:3000`; Next.js selects another free port if 3000 is occupied. Payload admin is at `/admin`. `compose.dev.yaml` binds PostgreSQL only to the host loopback interface on port 5433. The Home preview can display placeholders without a database; CMS reads, admin editing and publishing require PostgreSQL. See the [runbook](../docs/context/RUNBOOK.md) for current verification evidence.

## VPS configuration

[`compose.prod.yaml`](compose.prod.yaml) is a single VPS baseline. Copy `.env.production.example` to `.env.production` on the VPS and replace every placeholder. `SITE_DOMAIN` needs DNS pointed at the VPS and ports 80/443 available. `DATABASE_URL` must use the same credentials as `POSTGRES_*`; URL encode reserved characters in its password. Supply a real S3 compatible bucket and credentials. The database and media backup, schema migration, privacy, content and release checks in [Project Bootstrap](../docs/02-架构/PROJECT_BOOTSTRAP.md) must be completed before publishing.
