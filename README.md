# Mental Health Progress Tracker

A full-stack web application for recording daily mental health signals, reviewing short-term trends, and keeping the experience calm, simple, and private.

## Features

- Google OAuth sign-in
- Session-protected dashboard
- Daily mental health log form with validation
- SQLite persistence through Prisma
- Weekly and monthly trend views for mood, anxiety, and stress
- Real-time dashboard refresh when new entries are created

## Technologies Used

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Recharts
- socket.io-client

### Backend

- Node.js
- TypeScript
- Express
- Prisma
- SQLite
- Passport Google OAuth 2.0
- express-session
- socket.io
- Zod

## Project Structure

```text
MentalHealthProgressTracker/
├── backend/
│   ├── prisma/
│   └── src/
├── frontend/
│   └── src/
├── .gitignore
└── README.md
```

## Getting Started

### Backend

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create the environment file:

```bash
cp .env.example .env
```

3. Add the required backend variables:

```env
PORT=4000
CLIENT_URL=http://localhost:5173
DATABASE_URL="file:./dev.db"
SESSION_SECRET=replace-me
GOOGLE_CLIENT_ID=replace-me
GOOGLE_CLIENT_SECRET=replace-me
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback
```

4. Run the database migration:

```bash
npx prisma migrate dev
```

5. Start the backend:

```bash
npm run dev
```

### Frontend

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create the environment file:

```bash
cp .env.example .env
```

3. Add the required frontend variables:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

4. Start the frontend:

```bash
npm run dev
```

## Google OAuth Setup

Create a Google OAuth web client with:

- Authorized JavaScript origin: `http://localhost:5173`
- Authorized redirect URI: `http://localhost:4000/api/auth/google/callback`

## Available Scripts

### Backend

```bash
npm run dev
npm run typecheck
npm run build
npm run prisma:generate
npm run prisma:migrate -- --name <name>
npx prisma studio
```

### Frontend

```bash
npm run dev
npm run typecheck
npm run build
```
