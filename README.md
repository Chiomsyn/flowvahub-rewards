# Flowvahub Supabase Rewards Assessment Task

This project is a full-stack Supabase-powered rewards system covering authentication, user profiles, points, daily streaks, and rewards claiming.

All critical business logic is enforced at the database level using PostgreSQL functions, triggers, and Row Level Security (RLS).

## Features

### Authentication

- Email/password authentication via Supabase Auth
- Automatic profile creation on signup

### User Profiles

- Stores points, streaks, referral code, and metadata
- Auto-generated referral codes

### Rewards System

- Points-based rewards
- Claim tracking per user

### Daily Check-in & Streaks

- Daily points claim (+5 points)
- Streak tracking with milestone bonuses
- Race-condition safe (transactional)

### Security

- Row Level Security (RLS) on all tables
- Secure RPC calls using `auth.uid()`
- No trust placed on frontend identifiers

---

## Tech Stack

- Supabase (Auth, PostgreSQL, RPC Functions, Row Level Security)
- Next.js
- Tailwind CSS
- TypeScript

---

## Database Schema Overview

- **Core Tables**: `profiles`, `rewards`, `user_rewards`, `points_transactions`
- **Auth Table**: `auth.users` (managed by Supabase)

---

## Setup Instructions

### 1. Clone the repository

```bash
  git clone <your-repo-url>
  cd <project-folder>
```

### 2. Create a Supabase project

- Go to https://supabase.com
- Create a new project
- Save:Project URL, Anon public key, Service role key

### 3. Configure environment variables

- Create a .env.local file:

```bash
  NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run database setup

In the Supabase SQL Editor, run the SQL files in this order:

- **Tables**: (`profiles`, `rewards`, `user_rewards`, `points_transactions`)
- **Triggers**: (`Auto-create profile on signup`, `Generate referral code`)
- **Functions**: `claim_daily_points_v2()`
- **Row Level Security**: `Enable RLS on all tables`, `Apply policies`
- **Order matters** — triggers and functions assume tables already exist.

### 5. Enable RPC access

Ensure the function is callable by authenticated users:

```bash
GRANT EXECUTE ON FUNCTION claim_daily_points_v2 TO authenticated;
```

### 6. Run the app

```bash
pnpm install
pnpm dev
```

## Daily Check-in Flow

- User clicks “Claim Today’s Points”
- Frontend calls:
  `supabase.rpc("claim_daily_points_v2")`

## Database:

Verifies authentication
Prevents duplicate claims
Updates streak
Awards bonus points if applicable

- JSON response returned for UI updates

## Security Model

All sensitive logic lives in PostgreSQL
Frontend never passes user_id
auth.uid() is used inside functions
SECURITY DEFINER functions run safely with controlled privileges

- RLS ensures:
  Users only see their own data
  Rewards visibility is restricted appropriately

appropriately

## Assumptions & Trade-offs

- **Assumptions**
  One profile per authenticated user
  Points are the primary reward currency
  Daily check-in is limited to once per calendar day (UTC)

- **Trade-offs**
  Database-first logic was chosen over frontend logic
  => Improves security and consistency, but increases SQL complexity

  RPC over REST
  => Simplifies frontend calls but requires stronger DB discipline

  Streaks stored on profile
  => Faster reads, less historical querying, but slightly denormalized

\*\* All SQL migrations and functions are included in the /supabase directory.\*\*
