# ⚽ BetLeague

**Aplikacja bukmacherska – Top 5 Lig Europejskich**

> Dokumentacja projektowa & README  
> React 18 · Node.js · PostgreSQL | Projekt szkolny 2026

---

## 📋 Spis treści

1. [Opis projektu](#1-opis-projektu)
2. [Stack technologiczny](#2-stack-technologiczny)
3. [Architektura systemu i ERD bazy danych](#4-architektura-systemu-i-erd-bazy-danych)
4. [Instrukcja uruchomienia projektu](#8-instrukcja-uruchomienia-projektu)
5. [Struktura folderów](#9-struktura-folderów)
6. [Zmienne środowiskowe](#10-zmienne-środowiskowe)
7. [Koszty projektu – całkowicie darmowy](#11-koszty-projektu--całkowicie-darmowy)

---

## 1. 📝 Opis projektu

BetLeague to aplikacja webowa symulująca platformę bukmacherską dla celów edukacyjnych. Umożliwia użytkownikom typowanie wyników meczów piłkarskich z Top 5 europejskich lig. Projekt realizowany jest w ramach zajęć szkolnych przez 3-osobowy zespół.

### Obsługiwane ligi

- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (Anglia)
- 🇪🇸 La Liga (Hiszpania)
- 🇩🇪 Bundesliga (Niemcy)
- 🇮🇹 Serie A (Włochy)
- 🇫🇷 Ligue 1 (Francja)

---

## 2. 🛠️ Stack technologiczny

| Warstwa | Technologia | Opis |
|---|---|---|
| Frontend | React 18 | Biblioteka UI, SPA, hooks, React Router v6 |
| Styling | Tailwind CSS 3 | Utility-first CSS, responsywność, dark mode |
| State Management | Redux Toolkit | Globalne zarządzanie stanem aplikacji |
| Backend | Node.js + Express | REST API, middleware, routing |
| Baza danych | PostgreSQL 15 | Relacyjna baza danych, transakcje, indeksy |
| ORM | Prisma | Typesafe ORM, migracje, schema |
| Autentykacja | JWT + bcrypt | Tokeny dostępu, haszowanie haseł |
| API Sportowe | API-Football (RapidAPI) | Dane meczów, wyniki, top 5 lig |
| Walidacja | Zod | Walidacja danych wejściowych |
| Testowanie | Jest + Supertest | Testy jednostkowe i integracyjne API |
| Konteneryzacja | Docker + Docker Compose | Środowiska dev/prod, izolacja serwisów |
| Wersjonowanie | Git + GitHub | Kontrola wersji, code review, branches |

### Szczegółowy opis kluczowych technologii

**React 18**
- Komponenty funkcyjne + hooki (useState, useEffect, useContext)
- React Router v6 – routing po stronie klienta
- Axios – komunikacja z REST API

**Node.js + Express**
- Architektura MVC: routes → controllers → services → repositories
- Middleware: autentykacja JWT, obsługa błędów, CORS
- express-validator – walidacja danych wejściowych

**PostgreSQL + Prisma**
- Prisma Schema – definicja modeli i relacji
- Prisma Migrate – wersjonowanie schematu bazy
- Transakcje SQL dla operacji zakładów (atomowość)

**API-Football (RapidAPI)**
- Dostarczanie danych meczów, wyników i harmonogramu rozgrywek
- Scheduler (node-cron) – synchronizacja danych co 30 minut

**Docker + Docker Compose**
- Kontenery: app (Node.js), db (PostgreSQL)
- Jednolite środowisko dla wszystkich członków zespołu

---

### 3. Schemat ERD bazy danych

| Tabela | Kluczowe kolumny | Relacje |
|---|---|---|
| `users` | id, email, password_hash, balance, role, created_at | 1:N z bets |
| `matches` | id, home_team, away_team, league, date, status, score_home, score_away | 1:N z odds, 1:N z bets |
| `odds` | id, match_id, type (1/X/2), value, updated_at | N:1 z matches |
| `bets` | id, user_id, match_id, odd_id, amount, status, potential_win, created_at | N:1 z users, N:1 z matches, N:1 z odds |
| `transactions` | id, user_id, type (deposit/withdraw/win/loss), amount, created_at | N:1 z users |

### Kluczowe relacje

- `users` (1) → (N) `bets`: jeden użytkownik może mieć wiele zakładów
- `matches` (1) → (N) `odds`: jeden mecz ma wiele typów kursów (1/X/2)
- `matches` (1) → (N) `bets`: jeden mecz może mieć wiele zakładów od różnych użytkowników
- `bets` (N) → (1) `odds`: zakład jest powiązany z konkretnym kursem
- `users` (1) → (N) `transactions`: każda zmiana salda zapisywana jako transakcja

---


## 4. 🚀 Instrukcja uruchomienia projektu

### Wymagania wstępne

- Node.js >= 18.0.0
- Docker Desktop (lub Docker Engine + Docker Compose)
- Git
- Konto na RapidAPI + klucz do API-Football

### Uruchomienie z Docker Compose (zalecane)

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/twoj-zespol/betleague.git
cd betleague

# 2. Skopiuj plik zmiennych środowiskowych
cp .env.example .env
# Uzupełnij wartości w pliku .env (patrz sekcja 10)

# 3. Uruchom kontenery
docker-compose up --build

# 4. Zastosuj migracje bazy danych (w nowym terminalu)
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed
```

Aplikacja dostępna pod adresem:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

### Uruchomienie bez Dockera (tryb deweloperski)

```bash
# Backend
cd backend && npm install
npx prisma migrate dev
npm run dev

# Frontend (nowy terminal)
cd frontend && npm install
npm run dev
```

---

## 5. 📁 Struktura folderów

```
betleague/
├── frontend/
│   ├── src/
│   │   ├── components/       # Komponenty UI (przyciski, formularze, karty)
│   │   ├── pages/            # Widoki: Home, Login, Register, Bets, Admin
│   │   ├── store/            # Redux slices (auth, bets, matches)
│   │   ├── hooks/            # Własne hooki React
│   │   ├── api/              # Axios instance + wywołania API
│   │   └── utils/            # Funkcje pomocnicze
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/           # Definicje tras Express
│   │   ├── controllers/      # Obsługa żądań HTTP
│   │   ├── services/         # Logika biznesowa
│   │   ├── middleware/       # JWT auth, error handler, CORS
│   │   ├── jobs/             # node-cron scheduler
│   │   └── utils/            # Helpery, stałe
│   ├── prisma/
│   │   ├── schema.prisma     # Definicja modeli bazy danych
│   │   ├── migrations/       # Historia migracji
│   │   └── seed.ts           # Dane startowe (admin, przykładowe mecze)
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 6. 🔐 Zmienne środowiskowe

Skopiuj `.env.example` do `.env` i uzupełnij wartości:

```env
# Baza danych
DATABASE_URL="postgresql://user:password@localhost:5432/betleague"

# JWT
JWT_SECRET=twoj_super_tajny_klucz_min_32_znaki
JWT_EXPIRES_IN=24h

# API Sportowe
RAPIDAPI_KEY=twoj_klucz_z_rapidapi_com
RAPIDAPI_HOST=api-football-v1.p.rapidapi.com

# Serwer
PORT=5000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:5000/api
```

---

## 7. 💸 Koszty projektu – całkowicie darmowy

Projekt BetLeague nie generuje żadnych kosztów. Wszystkie użyte technologie i narzędzia są darmowe lub posiadają w pełni wystarczający plan bezpłatny. Aplikacja uruchamiana jest lokalnie – nie jest wymagany żaden płatny hosting.

| Technologia / Usługa | Plan | Koszt |
|---|---|---|
| React, Vite | Open Source (MIT) | 0 zł |
| Node.js + Express | Open Source (MIT) | 0 zł |
| PostgreSQL 15 | Open Source | 0 zł |
| Prisma ORM | Open Source (Apache 2.0) | 0 zł |
| Tailwind CSS | Open Source (MIT) | 0 zł |
| Redux Toolkit | Open Source (MIT) | 0 zł |
| Docker Desktop | Free (użytek osobisty/edukacyjny) | 0 zł |
| Git + GitHub | Free | 0 zł |
| API-Football (RapidAPI) | Free Plan – 100 zapytań/dzień | 0 zł |
| Jest + Supertest | Open Source (MIT) | 0 zł |
| ESLint + Prettier | Open Source | 0 zł |
| Hosting | Lokalnie na PC | 0 zł |
| **ŁĄCZNY KOSZT** | | **0 zł ✅** |

### Uwagi

- **API-Football Free Plan:** 100 zapytań/dzień w zupełności wystarczy. Scheduler co 30 minut zużywa max ~50 zapytań dziennie.
- **Docker Desktop:** bezpłatny do użytku osobistego i edukacyjnego – projekt niekomercyjny.
- **GitHub:** prywatne repozytoria są darmowe dla wszystkich użytkowników indywidualnych.
- **Brak hostingu w chmurze:** aplikacja działa wyłącznie lokalnie, co eliminuje jakiekolwiek koszty serwerowe.

---

*BetLeague – Projekt szkolny 2026 | React · Node.js · PostgreSQL*
