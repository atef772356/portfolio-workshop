# Atef Digital Workshop

A modular full-stack portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Auth.js, Prisma, and PostgreSQL.

## Features

- Distinct workshop-inspired art direction, not a generic portfolio template.
- Light and dark themes.
- Database-driven project case studies.
- Google and email/password sign-in.
- One seeded admin account with role-protected dashboard.
- Registered users list with sign-in method.
- Project CRUD and contact message viewer.
- Zod validation and bcrypt password hashing.

## Local setup on Windows

1. Copy environment variables:

```powershell
copy .env.example .env
```

2. Fill `DATABASE_URL`, Auth.js values, Google credentials, and admin credentials.

3. Install and initialize:

```powershell
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

4. Open `http://localhost:3000`.

## Google OAuth

Development callback URL:

```text
http://localhost:3000/api/auth/callback/google
```

For production, replace the origin with the deployed domain.

## Admin

The only admin is created or updated by `npm run db:seed` using `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Public registration always creates a `USER`.

## Validation

```powershell
npm run typecheck
npm run build
```
