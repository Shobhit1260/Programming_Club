# Programming Club (PTSC)

Professional README for the Programming & Tech Skills Club website and API.

This repository contains the frontend (React + Vite + Tailwind) and backend (Node.js + Express + MongoDB + AWS S3) for PTSC — a student programming club website with events, registrations, leaderboard, media and admin tools.

## Table of contents
- Project overview
- Tech stack
- Features
- Repo structure
- Prerequisites
- Environment variables
- Quick start (run locally)
- Useful scripts
- API / Routes (overview)
- Roles & authorization
- Deployment notes
- Linting & testing
- Contributing
- License & contact

---

## Project overview
PTSC (Programming & Tech Skills Club) is a full-stack application that lets club members view events, register for events, view media and a leaderboard, and allows admins to manage events, uploads and registrations. The backend stores data in MongoDB and stores uploaded media on AWS S3. The frontend is a responsive React application built with Vite and Tailwind CSS.

## Tech stack
- Frontend: React 19, Vite, Tailwind CSS, Framer Motion, React Router, Axios
- Backend: Node.js, Express, MongoDB (mongoose), JWT authentication, multer/multer-s3 for uploads
- Storage: AWS S3 for media
- Dev tooling: ESLint, Nodemon

## Key features
- Public pages: Landing, Events, Event Details + registration form, Leaderboard, Media
- Authenticated features: Dashboard, Register for events, View own registrations
- Admin features: Upload media, create events, view registrations (admin routes under `backend/Routes`)
- Role-based access: `member`, `admin`, and `root-admin` (only root-admin should be allowed to change other users' roles)

## Repo structure (top-level)
```
backend/
  index.js
  package.json
  Controllers/
  Models/
  Routes/
  Middlewares/
frontend/
  package.json
  src/
    components/
    pages/
    assets/
    context/
    utils/
README.md (this file)
```

More details are available directly in each subfolder.

## Prerequisites
- Node.js (v18+ recommended)
- npm (or pnpm/yarn) installed
- A MongoDB instance (Atlas or self-hosted)
- An AWS S3 bucket and credentials if you plan to upload media

## Environment variables
Create a `.env` file in `backend/` with at least the following variables (names are examples — check `backend/index.js` and `backend/config` for exact usage):

```
# Backend
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/ptsc?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
AWS_ACCESS_KEY_ID=AKIA... (if you use AWS uploads)
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your-bucket-name
```

If the frontend needs environment variables (for production or API base URL), create a `.env` in `frontend/` or set them through your hosting provider. Example for local dev (Vite):

```
VITE_API_BASE_URL=http://localhost:4000
```

## Quick start (run locally)
1. Clone the repo

```bash
git clone https://github.com/Shobhit1260/Programming_Club.git
cd Programming_Club
```

2. Install dependencies

```bash
# Install backend deps
npm --prefix backend install
# Install frontend deps
npm --prefix frontend install
```

3. Configure environment variables
- Create `backend/.env` and fill values (see above)
- Optionally set `frontend/.env` (for API base URL)

4. Start backend and frontend

Open two terminals or use a multiplexer.

Backend (development with nodemon):

```bash
npm --prefix backend run start
```

Frontend (Vite dev):

```bash
npm --prefix frontend run dev
```

- Frontend default dev server: http://localhost:5173
- Backend default server: http://localhost:4000 (or whatever `PORT` in your `.env`)

## Useful scripts
- Frontend
  - `npm --prefix frontend run dev` — start dev server
  - `npm --prefix frontend run build` — build for production
  - `npm --prefix frontend run lint` — run ESLint
- Backend
  - `npm --prefix backend run start` — start backend with nodemon (auto reload)

## API / Routes (overview)
The backend folders contain the routes and controllers; quick references:
- `backend/Routes/adminRoutes.js` — admin related operations (users, approvals, etc.)
- `backend/Routes/uploadRoutes.js` — upload endpoints (files => S3)
- `backend/Routes/leaderboradRoutes.js` — leaderboard related endpoints
- Common route base used in `backend/index.js`: routes are mounted under `/v1` and `/` as configured.

Tip: Inspect controller files in `backend/Controllers` for request/response shapes and required auth.

## Roles & authorization
This project expects three main roles:
- `member` — regular user who can register for events
- `admin` — manage events, view some registrations
- `root-admin` — highest privilege; should be the only role allowed to change other users' roles

Server-side middleware should enforce role checks (see `backend/Middlewares/isAuthenticated.js` and `isAuthorization.js`). If you implement user-role change routes, protect them so that only `root-admin` can update other users' roles.

## Deployment notes
- Frontend: build with `npm --prefix frontend run build` and deploy static files to Vercel / Netlify / surge / GitHub Pages.
- Backend: deploy to a Node hosting provider (Heroku, Render, Railway, DigitalOcean App Platform, etc.) and set the environment variables in the provider.
- Ensure CORS origins in `backend/index.js` include your frontend production domain(s).
- Configure AWS S3 permissions for uploads (do not expose secret keys; use server-side signing or IAM roles where available).

## Linting & testing
- The frontend contains ESLint configuration. Run `npm --prefix frontend run lint` to list issues. Many components currently include unused imports (e.g., `motion` from `framer-motion`) — either remove unused imports or run autofix where available.
- Add unit tests (Jest/React Testing Library) as needed. There are no tests included by default.

## Contributing
Contributions are welcome. Suggested workflow:
1. Fork the repository
2. Create a branch for your change: `git checkout -b feat/your-feature`
3. Make changes, run lint and basic manual checks
4. Open a PR describing the change, why it’s needed, and any migration/setup steps

Coding standards:
- Keep React components functional and small
- Keep API controllers focused and validate input
- Write clear commit messages

## Common issues & troubleshooting
- MongoDB connection errors: verify `MONGO_URI` and IP/network rules (Atlas). Check backend logs for connection attempts.
- CORS errors: confirm frontend origin is allowed in `backend/index.js` or set a permissive origin for testing.
- File upload problems: ensure S3 credentials and bucket names are correct and that server IAM user has PutObject permissions.

## Where to look first in the codebase
- `backend/index.js` — app bootstrapping, CORS config, route mounting
- `backend/Models` — mongoose schemas for users, events, registrations
- `backend/Controllers` — business logic
- `frontend/src/components` and `frontend/src/pages` — UI components and pages

## License
Add a license to this repository if desired (e.g., MIT). Currently, the repo does not include a license file.

## Contact
If you have questions about the project, open an issue or contact the maintainers via the repository.

---

If you'd like, I can:
- Add a more detailed API reference (list each endpoint + request/response shapes) by scanning controller files.
- Add a `LICENSE` file and contribution guidelines (CONTRIBUTING.md).
- Generate a short changelog or developer setup script to automate env creation.

Tell me which follow-up you'd like and I'll add it next.
