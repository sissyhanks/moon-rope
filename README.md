# Moon Rope

A moon-aware reflection journal for noticing patterns, gratitude, and daily life over time.

Moon Rope is a journaling tool designed to help people build a habit of noticing their lives. Entries are recorded daily and connected with lunar cycles to reveal patterns, emotional rhythms, and moments of meaning across time.

The goal is to create a gentle system that helps users return to presence — a kind of rope they can grab when they feel lost in the day.

---

## Current State (Phase 2)

Moon Rope is now a working application with lunar context and personal data tracking.

### Core Features

- 🌙 **Current Moon Tracking**
  - Displays the current moon sign and degree

- ✍️ **Daily Entry Logging**
  - Users can record gratitude and notes
  - Each entry is automatically tagged with:
    - moon sign
    - moon degree
    - timestamp

- 🔐 **User Authentication**
  - Email/password sign up and login via Supabase Auth
  - Entries are scoped to individual users

- 🗂 **Recent Entries**
  - Displays the most recent journal entries for the logged-in user

- 🔁 **Echo Feature (Lunar Recall)**
  - Surfaces entries from the _previous time the moon was in the same sign_
  - Creates a sense of temporal continuity and pattern recognition

- 🎨 **Styled Interface**
  - Tailwind-based UI for a clean, readable journaling experience

---

## Concept

Moon Rope is built around a simple loop:

Rather than focusing on prediction, the app uses the moon as a **contextual anchor for memory**.

Over time, users begin to notice:

- recurring emotional states
- patterns in behavior or energy
- connections between moments separated by time

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend

- Supabase
  - Postgres database
  - Authentication (email/password)
  - Row Level Security (RLS)

### Hosting

- Vercel

### Moon Calculations

- astronomia (current implementation)
- Swiss Ephemeris (planned for higher precision)

---

## Running the Project Locally

Clone the repository:

```bash
git clone <repo-url>
cd moon-rope-app
```
