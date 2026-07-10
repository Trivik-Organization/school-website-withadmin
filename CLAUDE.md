# School Website Project Rules

This file guides developers and AI assistants on how to build, run, and write code for this project.

## Commands
* **Start Dev Server**: `npm run dev`
* **Build Project**: `npm run build`
* **Reset & Seed Database**: `npx tsx src/db/seed.ts`

## Tech Stack & Coding Rules

### 1. Database (SQLite + Drizzle ORM)
* Store all data in the local SQLite database file: `school.db`.
* Define tables in `src/db/schema.ts`.
* Always use Drizzle ORM syntax to read/write data. Avoid raw SQL.

### 2. Styling (Tailwind CSS & shadcn/ui)
* **Tailwind & shadcn/ui**: The admin dashboard is built with Tailwind CSS utility classes and shadcn/ui components.
* **Component Styling**: For new custom UI elements, use Tailwind utility classes or CSS Modules where appropriate. Keep theme settings consistent with the variables in `src/app/globals.css`.

### 3. Security (Admin Routing)
* Admin page routes (`/admin/*`) and API writing endpoints (`POST`, `PUT`, `DELETE` to `/api/*`) must be guarded.
* All protection logic is managed centrally in **`src/proxy.ts`** using JWT cookie validation. Do not write custom auth check boilerplate in individual api files.

### 4. API Documentation
* If you add or modify an API endpoint, document it in the OpenAPI specification at **`src/app/api/docs/route.ts`** so it shows up in Swagger UI.
