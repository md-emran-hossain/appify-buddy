# Appify Buddy

A social media web app where users can create posts, like, comment, and interact with each other in real time.

## Features

- **Feed** — scroll through posts from all users with infinite loading
- **Posts** — create, edit, and delete posts with text and images
- **Comments & Replies** — comment on posts and reply to comments with nested threads
- **Likes** — like posts and comments, see who liked
- **Auth** — sign up / log in with email or Google OAuth
- **Dark Mode** — toggle between light and dark themes
- **Privacy** — choose Public or Private visibility per post

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Bootstrap 5, SCSS |
| Backend | NestJS, Prisma, PostgreSQL |
| Storage | Supabase (images) |
| Auth | JWT (access + refresh tokens via cookies) |
| Hosting | Vercel (frontend), Render (backend) |

## Getting Started

### Prerequisites

- Node.js 18+
- A running PostgreSQL database
- A Supabase project (for image uploads)

### Setup

1. Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd appify-buddy
npm install
```

2. Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

3. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> The frontend connects to the backend API. Make sure the backend is running separately on port 4000.

## How It Works

- API requests go through a Next.js proxy (`/api/v1/...`) that forwards them to the backend.
- Auth uses HTTP-only cookies with automatic token refresh.
- Posts and comments show relative timestamps (e.g. "now", "5m", "2h", "Yesterday").
