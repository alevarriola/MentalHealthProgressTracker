# Mental Health Progress Tracker

A full-stack web application for tracking daily mental health signals, visualizing trends over time, and supporting a calm, user-friendly self-reporting experience.

## Project Goal

This project is being built as a technical assessment using:

- `React` for the frontend
- `Node.js` for the backend
- `SQLite` for persistence

The application will allow users to:

- authenticate with Google
- submit daily mental health logs
- visualize weekly and monthly trends
- receive real-time chart updates as new entries are created

## Planned Stack

### Frontend

- `React`
- `TypeScript`
- `Vite`
- `React Router`
- `TanStack Query`
- `React Hook Form`
- `Zod`
- `Tailwind CSS`
- `Recharts`
- `socket.io-client`

### Backend

- `Node.js`
- `TypeScript`
- `Express`
- `Prisma`
- `SQLite`
- `Passport Google OAuth`
- `express-session`
- `socket.io`
- `Zod`

## Initial Structure

```text
MentalHealthProgressTracker/
├── backend/
│   └── src/
├── frontend/
│   └── src/
├── .gitignore
└── README.md
```

## Development Approach

The implementation is being organized around small, reviewable milestones:

- repository setup and project structure
- backend bootstrap
- data model and database integration
- Google authentication
- daily log API
- frontend bootstrap
- daily log form
- dashboard and charts
- real-time updates
- final polish and submission prep

