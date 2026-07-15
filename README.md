# StudyPact

A full-stack academic planning and accountability platform for managing study tasks, recording daily check-ins, and forming basic accountability connections.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

## Live Application

- **Frontend:** [study-pact-ochre.vercel.app](https://study-pact-ochre.vercel.app)
- **Backend:** [study-pact.onrender.com](https://study-pact.onrender.com)

> The backend is hosted on Render and may take a few moments to respond after a period of inactivity.

## Overview

StudyPact was built to go beyond a generic to-do list. It combines academic planning with lightweight accountability so students can:

- manage study tasks and deadlines;
- record one daily study check-in;
- review personal check-in history;
- connect with other users through friend requests;
- use the application through a responsive, production-deployed interface.

The current MVP provides **basic friend connections**, not shared social accountability. Tasks and check-ins remain private. Friend-visible activity, removal, blocking, privacy preferences, and accountability groups are deliberately deferred.

## Features

### Authentication

- User registration and login
- Password hashing with bcrypt
- JSON Web Token authentication
- Protected backend endpoints and frontend routes
- Redis-backed rate limiting on authentication endpoints

### Tasks

- Create, view, update, complete, and delete tasks
- Optional descriptions and due dates
- Low, medium, and high priorities
- Ownership-based authorization
- Loading, empty, error, and confirmation states

### Daily Check-Ins

- Record study hours and optional notes
- One check-in per user per calendar date
- View personal check-in history
- Database-level uniqueness enforcement

### Friends

- Send a friend request using an exact email address
- Accept or reject incoming requests
- View pending requests and accepted friends
- Prevent duplicate and crossed pending requests

### Production Engineering

- PostgreSQL persistence with Prisma ORM
- Redis-backed distributed rate limiting
- Centralized validation and error handling
- Health and readiness endpoints
- Docker-based local infrastructure
- Automated backend tests with Vitest and Supertest
- Vercel frontend deployment
- Render backend deployment
- Neon PostgreSQL
- Upstash Redis

## Architecture

```mermaid
flowchart LR
    U[Student Browser] --> V[Vercel React Frontend]
    V -->|HTTPS / JSON API| R[Render Express API]
    R --> P[(Neon PostgreSQL)]
    R --> D[(Upstash Redis)]

    subgraph Frontend
        V --> RR[React Router]
        V --> RQ[TanStack Query]
        V --> RHF[React Hook Form + Zod]
    end

    subgraph Backend
        R --> RT[Routes]
        RT --> MW[Middleware]
        MW --> C[Controllers]
        C --> S[Services]
        S --> RP[Repositories]
        RP --> PR[Prisma Client]
    end
```

### Backend Request Flow

```text
HTTP request
  -> Express middleware
  -> route
  -> authentication / rate limiting
  -> validation
  -> controller
  -> service
  -> repository
  -> Prisma
  -> PostgreSQL
  -> HTTP response
  -> centralized error handler on failure
```

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- bcrypt
- JSON Web Tokens
- Zod
- ioredis
- express-rate-limit
- rate-limit-redis

### Testing and Infrastructure

- Vitest
- Supertest
- Docker Compose
- PostgreSQL 16
- Redis 7
- Vercel
- Render
- Neon
- Upstash

## Repository Structure

```text
study-pact/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Feature and shared UI components
│   │   ├── context/            # Authentication context
│   │   ├── hooks/              # TanStack Query hooks
│   │   ├── lib/                # API utilities
│   │   ├── pages/              # Route-level pages
│   │   ├── App.tsx             # Application routing
│   │   └── main.tsx            # Frontend entry point
│   ├── package.json
│   └── vercel.json
│
├── server/                     # Express API
│   ├── prisma/
│   │   ├── migrations/         # Database migration history
│   │   └── schema.prisma       # Database models and constraints
│   ├── src/
│   │   ├── config/             # Environment, database, and Redis setup
│   │   ├── controllers/        # HTTP request/response translation
│   │   ├── middlewares/        # Authentication, errors, and rate limiting
│   │   ├── repositories/       # Database access
│   │   ├── routes/             # Express route definitions
│   │   ├── services/           # Business rules
│   │   ├── test/               # Backend integration tests
│   │   ├── validators/         # Zod validation schemas
│   │   ├── app.ts              # Express application composition
│   │   └── server.ts           # Network server entry point
│   ├── Dockerfile
│   └── package.json
│
├── docs/                       # Design and engineering documentation
├── docker-compose.yml          # Local PostgreSQL and Redis
└── README.md
```

## Database Model

```mermaid
erDiagram
    User ||--o{ Task : owns
    User ||--o{ CheckIn : records
    User ||--o{ FriendRequest : sends
    User ||--o{ FriendRequest : receives
```

The Prisma schema defines `User`, `Task`, `CheckIn`, and `FriendRequest` models. Important constraints include:

- unique user email addresses;
- one check-in per user per date;
- unique ordered sender/receiver friend-request pairs;
- cascading deletion of tasks, check-ins, and friend requests when a user is deleted at the database level.

## Local Development

### Prerequisites

- Node.js 20 or later recommended
- npm
- Docker Desktop or Docker Engine with Compose
- Git

### 1. Clone the repository

```bash
git clone https://github.com/sambhavi298/study-pact.git
cd study-pact
```

### 2. Configure PostgreSQL and Redis

Create a root `.env` file:

```env
POSTGRES_USER=studypact_dev
POSTGRES_PASSWORD=change-this-local-password
POSTGRES_DB=studypact
```

Start the local services:

```bash
docker compose up -d
```

This starts PostgreSQL on port `5432` and Redis on port `6379`.

### 3. Configure and start the backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://studypact_dev:change-this-local-password@localhost:5432/studypact?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1h"
REDIS_URL="redis://localhost:6379"
CORS_ORIGINS="http://localhost:5173"
```

Generate a development secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Generate Prisma Client and apply existing migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

Start the API:

```bash
npm run dev
```

The backend runs at `http://localhost:4000` by default.

### 4. Configure and start the frontend

Open a second terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:4000
```

Start the frontend:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

## Available Scripts

### Backend

Run from `server/`:

```bash
npm run dev       # Start the TypeScript development server
npm run build     # Compile the backend
npm start         # Run the compiled backend
npm test          # Run the automated backend tests
```

### Frontend

Run from `client/`:

```bash
npm run dev       # Start Vite development mode
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build locally
```

## API Summary

### Health

| Method | Endpoint | Auth | Purpose |
|---|---|---:|---|
| `GET` | `/health/live` | No | Confirms the API process is running |
| `GET` | `/health/ready` | No | Confirms required dependencies are reachable |

### Authentication

| Method | Endpoint | Auth | Purpose |
|---|---|---:|---|
| `POST` | `/auth/register` | No | Register a new user |
| `POST` | `/auth/login` | No | Authenticate and receive a JWT |

### Tasks

| Method | Endpoint | Auth | Purpose |
|---|---|---:|---|
| `POST` | `/tasks` | Yes | Create a task |
| `GET` | `/tasks` | Yes | List the current user's tasks |
| `GET` | `/tasks/:id` | Yes | Retrieve one owned task |
| `PUT` | `/tasks/:id` | Yes | Update an owned task |
| `DELETE` | `/tasks/:id` | Yes | Delete an owned task |

Additional user, check-in, and friend endpoints are defined under `server/src/routes/`.

## Testing

The backend test suite uses Vitest and Supertest and covers:

- registration and login;
- authentication failures;
- task CRUD and ownership authorization;
- daily check-in constraints;
- friend-request creation, acceptance, rejection, and duplicate handling.

Run the suite from `server/`:

```bash
npm test
```

The current repository does not include a browser-level end-to-end test suite or a dedicated frontend component-test suite.

## Security Notes

Current protections include:

- bcrypt password hashing;
- expiring signed JWTs;
- authentication middleware;
- ownership checks for private resources;
- Zod input validation;
- Prisma parameterized database operations;
- Redis-backed authentication rate limiting;
- environment-configured CORS origins;
- reverse-proxy trust configuration for correct client IP handling on Render.

This is an educational MVP, not a claim of perfect security. Future hardening should include token revocation, expanded security tests, account deletion, friend removal and blocking, monitoring, and a formal incident-response process.

## Deployment

```mermaid
flowchart LR
    A[GitHub] --> B[Vercel Frontend Build]
    A --> C[Render Docker Build]
    B --> D[React Application]
    C --> E[Express API]
    E --> F[(Neon PostgreSQL)]
    E --> G[(Upstash Redis)]
```

The frontend reads the API origin from `VITE_API_URL`. The backend reads configuration from environment variables including `DATABASE_URL`, `JWT_SECRET`, `REDIS_URL`, and `CORS_ORIGINS`.

Secrets must be configured through the hosting providers and must never be committed to the repository.

## Current Scope and Roadmap

### Implemented MVP

- Authentication
- Protected routes
- Task management
- Daily check-ins
- Basic friend requests and accepted connections
- Redis-backed rate limiting
- Automated backend testing
- Production deployment

### Deliberately Deferred

- Shared friend activity and check-in visibility
- Friend removal
- Blocking
- Privacy preferences
- Accountability groups
- Semester planning
- Recurring tasks
- Calendar integration
- Reminders and notifications
- Browser-level end-to-end tests

## Engineering Lessons Demonstrated

StudyPact demonstrates practical experience with:

- layered Express architecture;
- routes, controllers, services, and repositories;
- ownership-based authorization;
- relational constraints with Prisma and PostgreSQL;
- server-state management with TanStack Query;
- custom JWT authentication;
- distributed rate limiting;
- production CORS, proxy, routing, and module-format debugging;
- multi-service cloud deployment.

## Documentation

Additional documentation is available under [`docs/`](./docs), including the visual design system and project-learning material.

## Author

Built by [sambhavi298](https://github.com/sambhavi298).

## License

A root-level license file has not yet been added. Add a license before encouraging external reuse or contributions.
