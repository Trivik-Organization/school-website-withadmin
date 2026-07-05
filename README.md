# School Website Backend & Frontend Skeleton (Next.js 16)

Welcome to the project folder for the School Website and Admin Dashboard. This project serves as a secure, type-safe Next.js 16 portal containing:
1. **API Endpoints**: CRUD endpoints for school notices, events, blog posts, media galleries, file uploads, and contact inquiries.
2. **Database Layer**: A local SQLite database managed via Drizzle ORM.
3. **Frontend Page Skeletons**: Functional, unstyled pages for both the public website and the admin panel, fully wired to the backend database and API layers.

---

## 🗺️ File & Directory Directory Map

Here is which file is responsible for what:

### 1. Database Layer (`src/db/`)
* **[`src/db/schema.ts`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/db/schema.ts)**: **The blueprint.** Defines all database tables (users, notices, events, blogs, gallery items, and contact messages).
* **[`src/db/db.ts`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/db/db.ts)**: **The connector.** Establishes the connection to the local SQLite database file (`school.db`).
* **[`src/db/seed.ts`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/db/seed.ts)**: **The starter pack.** Hashes the admin password and seeds the database with mock records (notices, events, blogs, media, inquiries) and the default admin account.
* **[`drizzle.config.ts`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/drizzle.config.ts)**: Configuration file for running database migrations and pushes.

### 2. Security & Core Logic
* **[`src/lib/auth.ts`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/lib/auth.ts)**: **Security vault.** Contains helpers to encrypt/verify passwords, sign/verify stateless JWTs using WebCrypto APIs, and read/write session cookies.
* **[`src/proxy.ts`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/proxy.ts)**: **The gatekeeper.** (Next.js 16 replacement for `middleware.ts`). Intercepts incoming network requests. It allows public reads (`GET` requests), but blocks write operations (`POST`, `PUT`, `DELETE`, `PATCH`) to protected routes unless a valid admin session cookie is provided.

### 3. API Endpoints (`src/app/api/`)
* **`/api/auth/`**: Admin session control (`/login`, `/logout`, `/me`).
* **`/api/upload/`**: File upload handler. Saves images/PDFs directly to the `public/uploads/` directory on the VPS disk.
* **`/api/notices/`**: CRUD operations for the notice board.
* **`/api/events/`**: CRUD operations for upcoming and past school events.
* **`/api/blogs/`**: CRUD operations for news and blogs.
* **`/api/gallery/`**: CRUD operations for media photos and video URLs. Automatically deletes local file assets from disk when their database record is deleted.
* **`/api/inquiries/`**: Public contact form submissions and admin inquiry view/updates.

### 4. Interactive Documentation
* **[`src/app/api-docs/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/api-docs/page.tsx)**: Displays the interactive **Swagger UI** for testing APIs visually.
* **[`src/app/api/docs/route.ts`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/api/docs/route.ts)**: Exports the OpenAPI 3.0 JSON specification loaded by the Swagger interface.

---

## 🎨 Frontend Architecture

The frontend is divided into two Route Groups: **Public Facing Website** `(public)` and **Admin Panel** `(admin)`. 

### A. Public Facing Website `(public)`
These pages share a common outer layout [`src/app/(public)/layout.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(public)/layout.tsx) which displays the school header navigation, logo link, and footer.

1. **Home Page ([`page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(public)/page.tsx))**: 
   * *How it works:* A Server Component. It queries the SQLite database directly on the server to get the latest 3 notices, events, and blogs. This ensures instant load times with zero client-side API requests.
2. **About Page ([`about/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(public)/about/page.tsx))**:
   * *How it works:* A static React page describing the school's mission, vision, and principal's message.
3. **Notices Page ([`notices/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(public)/notices/page.tsx))**:
   * *How it works:* Server-rendered. Queries all notices, displaying pinned items with yellow highlights at the top. Includes download buttons linked to notice PDF/Doc attachment file URLs.
4. **Events Page ([`events/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(public)/events/page.tsx))**:
   * *How it works:* Server-rendered. Takes the current date and dynamically filters events from the database into two sections: "Upcoming Events" (sorted soonest first) and "Past Events" (sorted most recent first).
5. **Blog List Page ([`blog/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(public)/blog/page.tsx))**:
   * *How it works:* Server-rendered list of news and blog posts. Renders article summaries with links to the dynamic detail page.
6. **Blog Detail Page ([`blog/[id]/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(public)/blog/[id]/page.tsx))**:
   * *How it works:* A dynamic route. Awaits the promise-based route `params` (Next.js 16 rule), extracts the integer ID, fetches the specific blog post from the database, and displays it. Returns a 404 page if not found.
7. **Gallery Page ([`gallery/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(public)/gallery/page.tsx))**:
   * *How it works:* Client-side Component (`"use client"`). Fetches all media items from `/api/gallery` on load. Renders filtering dropdowns so users can sort items dynamically by Media Type (Photos vs Videos) and Category (Infrastructure, Sports, Events).
8. **Contact Page ([`contact/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(public)/contact/page.tsx))**:
   * *How it works:* Client-side Component (`"use client"`). Renders a form (Name, Email, Subject, Message). Submit triggers a `POST` request to `/api/inquiries`, displaying success/error feedback messages.

---

### B. Admin Dashboard Panel `(admin)`
These pages share a common admin frame [`src/app/(admin)/admin/layout.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(admin)/admin/layout.tsx) which verifies the server-side JWT session cookie, displays the admin profile, and renders a sidebar navigation.

1. **Admin Login Page ([`admin/login/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(admin)/admin/login/page.tsx))**:
   * *How it works:* Client Component. Accepts credentials, sends a `POST` to `/api/auth/login`, and redirects to `/admin/dashboard` upon success.
2. **Dashboard Home ([`admin/dashboard/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(admin)/admin/dashboard/page.tsx))**:
   * *How it works:* Server Component. Queries database counts directly, displaying cards for total notices, events, blogs, and unread inquiries.
3. **Notices Manager ([`admin/notices/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(admin)/admin/notices/page.tsx))**:
   * *How it works:* Client Component. Displays a table listing notices and an editor form panel. Admins can click "Edit" to load notice details into the form (editing triggers a `PUT` request) or delete them (triggers a `DELETE` request).
4. **Events Manager ([`admin/events/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(admin)/admin/events/page.tsx))**:
   * *How it works:* Client Component. Displays events table and editor panel, communicating with `/api/events` (POST, PUT, DELETE).
5. **Blogs Manager ([`admin/blog/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(admin)/admin/blog/page.tsx))**:
   * *How it works:* Client Component. Displays blog posts table and editor panel, communicating with `/api/blogs` (POST, PUT, DELETE).
6. **Gallery Manager ([`admin/gallery/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(admin)/admin/gallery/page.tsx))**:
   * *How it works:* Client Component. Handles photo uploads and video URLs.
   * *File Upload flow:* If the media type is set to "Photo" and a file is selected, submitting the form will first send a `POST` request with the file to `/api/upload`. When the API returns the file URL path, the component automatically submits a second request to `/api/gallery` saving the photo metadata.
7. **Contact Inquiries ([`admin/inquiries/page.tsx`](file:///home/ritupandeka/Trivik%20Organization/school-website-withadmin/src/app/(admin)/admin/inquiries/page.tsx))**:
   * *How it works:* Client Component. Lists visitor inquiries. Includes buttons to update inquiry status (PATCHing `isRead` to true/false) or delete inquiries.

---

## 💻 Running the Project Locally

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Setup the SQLite Database
Run a schema push to create the database file (`school.db`) and run the seeding script to initialize sample data and create the admin account:
```bash
# Push schema structure to school.db
npx drizzle-kit push

# Load seed data & default admin
npx tsx src/db/seed.ts
```

### 3. Run the Dev Server
Start the development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

* **API Swagger Docs**: Visit **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)** to visually test all endpoints.
* **Default Admin Account**: Username: `admin` | Password: `admin123`
