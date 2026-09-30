# 💗 SheCare — A Digital Companion for Women Battling Breast Cancer

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-v5-7C3AED)
![Tests](https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white)

SheCare started at **Startup Weekend Algiers 2025** as a frontend prototype. **v2** turns it into a complete full-stack application: real accounts, a PostgreSQL database, and every page backed by live data.

## 🧩 The Problem

Women going through breast cancer treatment have to juggle appointments, symptoms, nutrition and their mental health — often alone, with information scattered everywhere.

## ✨ Features

| Module | What you can do |
|--------|-----------------|
| 🔐 **Accounts** | Sign up, sign in, change password, export all your data (JSON), delete your account |
| 📊 **Dashboard** | Treatment days, wellness score trend, next appointment, treatment cycle progress, recent activity — all computed from your data |
| 🩺 **Health tracker** | Daily check-in (energy, mood, sleep, water), symptom log with severity, vital signs, full history |
| 🧘 **Wellness hub** | Guided meditation, breathing and music sessions, private journal with prompts, weekly stats and day streak |
| 💬 **Community** | Share stories by category, hearts, comments, pagination — with an option to post anonymously |
| 👩‍⚕️ **Consultations** | Book specialists by video, phone or chat; slots computed from opening hours; double-booking prevented; cancel upcoming appointments |
| 📚 **Resources** | Searchable library of articles, videos and PDFs, filter by type, article pages |
| 👤 **Profile** | Personal and medical information, notification and privacy preferences |

## 🏗️ Architecture

```mermaid
graph LR
    B[Browser] -->|RSC / Server Actions| N[Next.js 14 App Router]
    M[Middleware<br/>Auth.js JWT] -->|protects routes| N
    N --> A[Server Actions<br/>Zod validation]
    N --> R[Route Handlers<br/>/api/health · /api/me/export]
    A --> P[Prisma ORM]
    R --> P
    P --> DB[(PostgreSQL)]
```

- **No separate API server**: reads happen in React Server Components, writes go through **Server Actions**.
- **Every input is validated on the server** with Zod; errors are returned per field and shown in the form.
- **Authorization is enforced in every query** (`where: { id, userId }`), so a user can never read or modify someone else's records.
- **Bookings run in a serializable transaction** that checks overlaps for both the specialist and the patient, so two people cannot take the same slot.
- **Passwords** are hashed with bcrypt (cost 12); the export endpoint never includes the hash.

## 🗄️ Data Model

```mermaid
erDiagram
    USER ||--o| MEDICAL_PROFILE : has
    USER ||--o| PREFERENCES : has
    USER ||--o{ DAILY_LOG : logs
    USER ||--o{ SYMPTOM_LOG : logs
    USER ||--o{ VITAL_READING : records
    USER ||--o{ JOURNAL_ENTRY : writes
    USER ||--o{ WELLNESS_SESSION : completes
    USER ||--o{ POST : shares
    USER ||--o{ COMMENT : writes
    USER ||--o{ POST_LIKE : gives
    POST ||--o{ COMMENT : has
    POST ||--o{ POST_LIKE : receives
    USER ||--o{ APPOINTMENT : books
    SPECIALIST ||--o{ APPOINTMENT : receives
    RESOURCE
```

Deleting a user cascades to all of their data. The full schema is in [`prisma/schema.prisma`](prisma/schema.prisma).
