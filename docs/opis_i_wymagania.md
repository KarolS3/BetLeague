# 📘 Dokumentacja projektowa — BetLeague

## 1. Opis projektu

BetLeague to edukacyjna aplikacja webowa umożliwiająca typowanie wyników meczów piłkarskich z pięciu największych lig europejskich. Projekt ma na celu odwzorowanie podstawowych mechanizmów platform bukmacherskich, takich jak kursy, zakłady, saldo użytkownika oraz historia transakcji.

Aplikacja działa wyłącznie lokalnie i nie wykorzystuje prawdziwych pieniędzy.

---

## 2. Zakres projektu

### 2.1 Funkcjonalności użytkownika
- rejestracja i logowanie (JWT)
- przeglądanie listy meczów
- podgląd kursów (1/X/2)
- obstawianie zakładów
- podgląd salda i historii transakcji
- automatyczne rozliczanie zakładów po zakończeniu meczu

### 2.2 Funkcjonalności systemowe
- synchronizacja danych z API-Football co 30 minut
- aktualizacja kursów
- zapis transakcji (deposit/withdraw/win/loss)
- relacyjna baza danych z pełną historią operacji

---

## 3. Architektura systemu

### 3.1 Frontend
- React 18 (SPA)
- Redux Toolkit (auth, matches, bets)
- Tailwind CSS
- Axios (komunikacja z API)

### 3.2 Backend
- Node.js + Express
- Architektura: routes → controllers → services → repositories
- Middleware: JWT auth, error handler, CORS
- Prisma ORM + PostgreSQL

### 3.3 Integracje
- API-Football (RapidAPI)
- node-cron — harmonogram synchronizacji

---

## 4. Model danych (ERD)

### Tabele:
- **users** — dane użytkowników, saldo
- **matches** — mecze, wyniki, status
- **odds** — kursy 1/X/2
- **bets** — zakłady użytkowników
- **transactions** — historia zmian salda

---

## 5. Wymagania niefunkcjonalne

- responsywność interfejsu
- czas odpowiedzi API < 300 ms (lokalnie)
- spójność danych (transakcje atomowe)
- bezpieczeństwo: haszowanie haseł, JWT, walidacja danych

---

## 6. Instrukcja uruchomienia

### 6.1 Wymagania
- Node.js 18+
- Docker Desktop
- RapidAPI key

### 6.2 Uruchomienie (Docker)
```bash
git clone ...
cp .env.example .env
docker-compose up --build
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed
