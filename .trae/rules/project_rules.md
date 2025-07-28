# Cloudflare Workers Next.js SaaS Template

This is a comprehensive, production-ready Next.js SaaS template designed to run on Cloudflare Workers with OpenNext. It includes authentication, team management, billing, and other common SaaS features needed to launch a modern web application.

**Live Demo**: [nextjs-saas-template.agenticdev.agency](mdc:https:/nextjs-saas-template.agenticdev.agency/sign-up)

**GitHub Repository**: [cloudflare-workers-nextjs-saas-template](mdc:https:/github.com/LubomirGeorgiev/cloudflare-workers-nextjs-saas-template)

## Key Capabilities

- **Authentication & Security**: Complete auth system with Lucia Auth, WebAuthn/Passkeys, OAuth, rate limiting, and session management
- **Multi-tenancy**: Teams/organizations with role-based permissions and tenant isolation
- **Billing System**: Credit-based billing with Stripe integration, usage tracking, and transaction history
- **Admin Dashboard**: User management, credit administration, and analytics
- **Modern Stack**: Next.js 15, React Server Components, TypeScript, Tailwind CSS, Shadcn UI
- **Edge Computing**: Cloudflare Workers with D1 database, KV storage, and global deployment
- **Email System**: React Email templates with Resend/Brevo integration
- **Developer Experience**: Full TypeScript support, Drizzle ORM, automated deployments

You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI, Tailwind CSS and DrizzleORM.

# Project Technical Details

> **Note**: This project is based on an open source Next.js SaaS template for Cloudflare Workers. You can find the original template at: https://github.com/LubomirGeorgiev/cloudflare-workers-nextjs-saas-template

## Cloudflare Stack

You are also excellent at Cloudflare Workers and other tools like D1 serverless database and KV. You can suggest usage of new tools (changes in wrangler.jsonc file) to add more primitives like:
- R2: File storage
- KV: Key-value storage
  - Always use the existing KV namespace in `wrangler.jsonc` don't ever create new ones.
- AI: AI multimodal inference
- others primitives in `wrangler.jsonc`
- After adding a new primitive to `wrangler.jsonc`, always run `pnpm run cf-typegen` to generate the new types.

## Package Management

In the terminal, you are also an expert at suggesting wrangler commands
 - Always use pnpm to install dependencies.

## Migration Commands

Never generate SQL migration files. Instead after making changes to `./src/db/migrations` you should run `pnpm db:generate [MIGRATION_NAME]` to generate the migrations.

## Tech Stack Overview

### Frontend
- Next.js 15 (App Router)
- React Server Components
- TypeScript
- Tailwind CSS
- Shadcn UI (Built on Radix UI)
- Lucide Icons
- NUQS for URL state management
- Zustand for client state

### Backend (Cloudflare Workers with OpenNext)
- DrizzleORM
- Cloudflare D1 (SQLite Database)
- Cloudflare KV (Session/Cache Storage)
- Cloudflare R2 (File Storage)
- OpenNext for SSR/Edge deployment

### Authentication & Authorization
- Lucia Auth (User Management)
- KV-based session management
- CUID2 for ID generation
- Team-based multi-tenancy

## Project Structure

```
├── src/                          # Source directory
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Auth-related routes
│   │   │   ├── sign-in/          # Sign in functionality
│   │   │   ├── sign-up/          # Sign up functionality
│   │   │   ├── forgot-password/  # Password reset request
│   │   │   └── reset-password/   # Password reset completion
│   │   ├── (dashboard)/          # Dashboard and app features
│   │   ├── (legal)/              # Legal pages (terms, privacy)
│   │   ├── (marketing)/          # Landing pages and marketing
│   │   ├── (settings)/           # User settings pages
│   │   │   └── settings/
│   │   │       ├── profile/      # Profile settings
│   │   │       └── sessions/     # Session management
│   │   ├── teams/                # Team management
│   │   │   ├── [teamId]/         # Team-specific routes
│   │   │   │   ├── members/      # Team member management
│   │   │   │   ├── settings/     # Team settings
│   │   │   │   └── billing/      # Team billing
│   │   │   └── create/           # Team creation
│   │   ├── api/                  # API routes
│   │   └── globals.css           # Global styles
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components
│   │   ├── layout/               # Layout components
│   │   ├── teams/                # Team-related components
│   │   └── ui/                   # Shadcn UI components
│   ├── db/                       # Database related code
│   │   ├── migrations/           # Database migrations
│   │   └── schema.ts             # DrizzleORM schema
│   ├── react-email/              # Email templates with react-email
│   │   ├── reset-password.tsx
│   │   ├── verify-email.tsx
│   │   └── team-invitation.tsx   # Team invitation email
│   ├── schemas/                  # Zod validation schemas
│   ├── state/                    # Client state management (Zustand)
│   │   ├── session.ts            # Session state store
│   │   └── team.ts               # Team context state
│   └── utils/                    # Core utilities
│       ├── auth.ts               # Authentication logic
│       ├── email.tsx             # Email sending utilities
│       ├── kv-session.ts         # Session handling with KV
│       └── team-auth.ts          # Team authorization utilities
├── public/                       # Static assets
└── .wrangler/                    # Cloudflare Workers config
```

## Development Status

### Completed Features ✅
- Infrastructure setup (Next.js, Cloudflare Workers, D1, KV)
- Authentication system (Lucia Auth)
- User management and settings
- Session management with KV storage
- Dashboard layout with navigation
- Password reset flow
- Email system with templates
- Security enhancements (rate limiting, input sanitization)
- Credit-based billing system
- Stripe payment processing
- Multi-tenancy implementation
- Team management with roles and permissions
- Admin dashboard

### In Progress
- Real-time updates
- Analytics dashboard
- File upload system with R2
- Audit logging

### Key Features

#### User Management
- Authentication (Lucia Auth)
- User profiles and settings
- Session management
- Admin panel with user/credit/transaction management
- Team management with role-based permissions

#### Multi-Tenancy
- Teams and organizations
- Role-based access control (system and custom roles)
- Fine-grained permissions with JSON storage
- Team invitations and onboarding
- Team settings and management

#### Billing & Subscriptions
- Credit-based billing system
- Credit packages and pricing
- Credit usage tracking
- Transaction history
- Monthly credit refresh
- Stripe payment processing

## Development Guidelines

### Code Style
- Functional components with TypeScript
- Server Components by default, 'use client' only when needed
- Modular file structure with clear separation of concerns
- Form validation with Zod schemas
- State management:
  - Server state with React Server Components
  - Client state with Zustand where needed
  - URL state with NUQS
- Cloudflare bindings accessed through getCloudflareContext

### Database Schema
- User table with CUID2 based IDs and timestamps
- Session storage in KV with secure management
- Team, team membership, and team invitation tables
- Team role table with JSON permissions
- Credit and transaction tables
- Resource tables

### Security & Performance
- Edge computing with Cloudflare Workers
- React Server Components for performance
- Session-based auth with KV storage
- Rate limiting for API endpoints
- Input validation and sanitization
- Efficient data fetching and asset optimization

# Authentication Guidelines

## Authentication Stack

The authentication logic is in `src/utils/auth.ts` and `src/utils/kv-session.ts` and is based on Lucia Auth.

## Server Components

If we want to access the session in a server component, we need to use the `getSessionFromCookie` function in `src/utils/auth.ts`.

## Client Components

If we want to access the session in a client component, we can get it from `const session = useSessionStore();` in `src/state/session.ts`.

# Database Patterns

The database schema is in `src/db/schema.ts`.

## Drizzle ORM Guidelines

- Never use Drizzle ORM Transactions since Cloudflare D1 doesn't support them.
- When inserting or updating items with Drizzle ORM never pass an id since we autogenerate it in the schema.
- When using `db.insert().values()` never pass and id because we autogenerate them.

## Migration Workflow

Never generate SQL migration files. Instead after making changes to `./src/db/migrations` you should run `pnpm db:generate [MIGRATION_NAME]` to generate the migrations.

# Code Style and Structure

## General Principles

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.
- Never delete any comments in the code unless they are no longer relevant.

## Function Guidelines

- When a function has more than 1 parameter, always pass them as a named object.
- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.

## Import Guidelines

- Add `import "server-only"` at the top of the file (ignore this rule for page.tsx files) if it's only intended to be used on the server.
- When creating React server actions always use `import { useServerAction } from "zsa-react"`

## Package Management

- Before adding any new packages, always check if we already have them in `package.json` to avoid duplicates.
- Use `pnpm` for all package management operations.

## Type Definitions

- When you have to add a global type, add it to `custom-env.d.ts` instead of `cloudflare-env.d.ts`, because otherwise it will be overridden by `pnpm run cf-typegen`.

# TypeScript Usage

## Type Definitions

- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

## Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

## Syntax and Formatting

- Use declarative JSX.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.

# UI and Styling

## Component Libraries

- Use Shadcn UI, Hero-UI, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.
- Optimize for light and dark mode.

## Layout Guidelines

- When using a "container" class, use the "mx-auto" class to center the content.

## Performance Optimization

- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.

# Next.js Patterns

## Key Conventions

- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Follow Next.js docs for Data Fetching, Rendering, and Routing.

## Client Component Usage

Limit 'use client':
- Favor server components and Next.js SSR.
- Use only for Web API access in small components.
- Avoid for data fetching or state management.

## Performance Guidelines

- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
