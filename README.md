# Post Generator

A full-stack web application that generates AI-powered social media content (X / LinkedIn / Image prompts). Includes an Express + MongoDB backend and two React frontends (classic Frontend and a TypeScript/Vite "new-fe").

---

## Quick summary

- Backend: Node.js + Express, AI generation logic and authentication.
  - Main router & AI logic: [backend/Routers/user.js](backend/Routers/user.js)
  - LinkedIn generation helper: [backend/Routers/Linkedin.js](backend/Routers/Linkedin.js)
  - User model: [`UserModel`](backend/models/userSchema.js) — [backend/models/userSchema.js](backend/models/userSchema.js)
  - Config tokens: [`JWT_SECRET`, `JWT_SECRET_ADMIN`](backend/config.js) — [backend/config.js](backend/config.js)

- Frontend(s):
  - Classic React frontend: [Frontend/](Frontend/)
  - New TypeScript + Vite frontend: [new-fe/](new-fe/)
    - Configured backend constant: [`BACKEND_URL`](new-fe/src/components/config.ts) — [new-fe/src/components/config.ts](new-fe/src/components/config.ts)
    - Key components: [`Register`](new-fe/src/components/Register.tsx), [`Login`](new-fe/src/components/Login.tsx), [`InputBox`](new-fe/src/components/InputBox.tsx), [`NavBar`](new-fe/src/components/NavBar.tsx), [`Posts`](new-fe/src/components/Posts.tsx) — see files:
      - [new-fe/src/components/Register.tsx](new-fe/src/components/Register.tsx)
      - [new-fe/src/components/Login.tsx](new-fe/src/components/Login.tsx)
      - [new-fe/src/components/InputBox.tsx](new-fe/src/components/InputBox.tsx)
      - [new-fe/src/components/NavBar.tsx](new-fe/src/components/NavBar.tsx)
      - [new-fe/src/components/Posts.tsx](new-fe/src/components/Posts.tsx)

---

## Prerequisites

- Node.js >= 18
- npm (or yarn)
- MongoDB (local or cloud)
- For new-fe: pnpm / npm (Vite + TypeScript)

---

## Environment

Backend expects environment variables (or local files):
- VITE-like variables are used in frontends. For backend, check `backend/index.js` and `backend/config.js`.
- Frontend classic: uses Vite env keys like `VITE_BACKEND_URL` (referenced across [Frontend/](Frontend/)).
- new-fe: uses `import.meta.env.VITE_BACKEND_URL` and `VITE_LINKEDIN_URL`. See [new-fe/src/components/config.ts](new-fe/src/components/config.ts) and components that read env (e.g. [new-fe/src/components/InputBox.tsx](new-fe/src/components/InputBox.tsx), [new-fe/src/components/Register.tsx](new-fe/src/components/Register.tsx)).

Recommendation:
- Create `.env` (or platform environment) entries:
  - BACKEND: MONGO_URI, PORT, JWT_SECRET, JWT_SECRET_ADMIN
  - FRONTEND / new-fe: VITE_BACKEND_URL, VITE_LINKEDIN_URL

---

## Install & Run

1. Root (optional)
   - npm install

2. Backend
   - cd backend
   - npm install
   - Start (development):
     - nodemon index.js
     - or: node index.js
   - Important files:
     - [backend/index.js](backend/index.js)
     - [backend/Routers/user.js](backend/Routers/user.js)

3. Frontend (classic)
   - cd Frontend
   - npm install
   - npm run dev
   - Entry: [Frontend/src/main.jsx](Frontend/src/main.jsx)

4. Frontend (new-fe - TypeScript / Vite)
   - cd new-fe
   - npm install
   - npm run dev
   - Entry: [new-fe/src/main.tsx](new-fe/src/main.tsx)

---

## API Endpoints (overview)

Most endpoints are defined in [backend/Routers/user.js](backend/Routers/user.js). Common endpoints used by frontends:

- POST /signup — user registration (used by [`registerEvent`](new-fe/src/components/Register.tsx))
- POST /login — user login (used by [`loginEvent`](new-fe/src/components/Login.tsx))
- GET /getDetails — fetch current user details (used by [Frontend/src/App.jsx](Frontend/src/App.jsx))
- POST /GenerateData — generate X tweets (AI) (used by [`InputBox`](new-fe/src/components/InputBox.tsx) and [Frontend/src/component/InputField.jsx](Frontend/src/component/InputField.jsx))
- POST /generate-post — LinkedIn post generation (see [backend/Routers/Linkedin.js](backend/Routers/Linkedin.js))
- DELETE /logout — clear auth cookies (used by profile menu components)

See implementation: [backend/Routers/user.js](backend/Routers/user.js) and [backend/Routers/Linkedin.js](backend/Routers/Linkedin.js).

---

## Frontend notes

- Redux store (classic Frontend): [Frontend/src/store.js](Frontend/src/store.js) and slices like [`linkedinSlice`](Frontend/src/slices/linkedinSlice.js).
- Toasting:
  - Classic: custom `Toast` component at [Frontend/src/component/Toast.jsx](Frontend/src/component/Toast.jsx)
  - new-fe: uses `react-hot-toast` and [`Toaster`](new-fe/src/components/Register.tsx)
- Image generation & prompts: check the system prompts and image spec in [backend/Routers/user.js](backend/Routers/user.js) and [backend/Routers/Linkedin.js](backend/Routers/Linkedin.js).
- Token flow for OAuth callback (new-fe): [new-fe/src/components/Cookie.tsx](new-fe/src/components/Cookie.tsx)

---

## Security & Notes

- JWT secrets are in [backend/config.js](backend/config.js) — rotate & move to environment variables in production.
- The backend code contains elaborate system prompts for an AI model (review for policy and safety before production usage). See [backend/Routers/user.js](backend/Routers/user.js) and [backend/Routers/Linkedin.js](backend/Routers/Linkedin.js).
- Ensure CORS and cookie settings match frontends (credentials:true used in fetch calls).

---

## Troubleshooting

- 401 / missing token: verify cookie flow (see [new-fe/src/components/Cookie.tsx](new-fe/src/components/Cookie.tsx)).
- AI response parsing issues: inspect `completion` handling in [backend/Routers/user.js](backend/Routers/user.js) and JSON extraction helpers in [backend/Routers/Linkedin.js](backend/Routers/Linkedin.js).
- Mongo errors: check `MONGO_URI` and model at [backend/models/userSchema.js](backend/models/userSchema.js).

---

## Contributing

- Fork, branch, lint, and open PR.
- Follow existing patterns in the frontends, use TypeScript for new-fe features.
- Run linters in respective frontends:
  - [new-fe/eslint.config.js](new-fe/eslint.config.js)
  - [Frontend/eslint.config.js](Frontend/eslint.config.js)

---

## Useful files & entry points

- Backend entry: [backend/index.js](backend/index.js)
- Backend routers: [backend/Routers/user.js](backend/Routers/user.js), [backend/Routers/Linkedin.js](backend/Routers/Linkedin.js)
- Backend model: [`UserModel`](backend/models/userSchema.js) — [backend/models/userSchema.js](backend/models/userSchema.js)
- Frontend (classic) entry: [Frontend/src/main.jsx](Frontend/src/main.jsx)
- Frontend (new-fe) entry: [new-fe/src/main.tsx](new-fe/src/main.tsx)
- new-fe core config: [new-fe/src/components/config.ts](new-fe/src/components/config.ts)
- new-fe important components:
  - [new-fe/src/components/Register.tsx](new-fe/src/components/Register.tsx) — [`registerEvent`](new-fe/src/components/Register.tsx)
  - [new-fe/src/components/Login.tsx](new-fe/src/components/Login.tsx) — [`loginEvent`](new-fe/src/components/Login.tsx)
  - [new-fe/src/components/InputBox.tsx](new-fe/src/components/InputBox.tsx)
  - [new-fe/src/components/NavBar.tsx](new-fe/src/components/NavBar.tsx)

---

## License & Authors

- Authors: TejaBudumuru3, Vamsidarling (see repo metadata)
- License: (specify your license file if present)

---