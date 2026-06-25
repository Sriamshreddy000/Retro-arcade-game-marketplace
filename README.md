# Retro-arcade-game-marketplace

# Retro Arcade Marketplace

A retro-themed game marketplace where users can browse arcade games, manage a cart, purchase via PayPal, and chat with sellers in real-time per game listing. Includes an admin panel for payment logs.

## Tech Stack

**Frontend** — React, React Router, React Context API, PayPal JS SDK, WebSockets (SockJS + STOMP)

**Backend** — Java 17, Spring Boot 3, Spring Data JPA, Spring WebSocket (STOMP), PostgreSQL, Lombok

## Project Structure

```
retro-arcade-marketplace/   → Spring Boot REST API + WebSocket server
retro-arcade-frontend/      → React client
```

## Getting Started

### Prerequisites

- Java 17+
- Maven
- Node.js
- PostgreSQL running locally

### 1. Database Setup

```sql
CREATE DATABASE retro_arcade;
```

### 2. Backend

Set your database password as an environment variable:

```bash
export DB_PASSWORD=your_postgres_password
```

Then run:

```bash
cd retro-arcade-marketplace
./mvnw spring-boot:run
```

Server runs at `http://localhost:8080`.

### 3. Frontend

```bash
cd retro-arcade-frontend
npm install
npm start
```

App runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/games` | Get all games |
| GET | `/api/games/{id}` | Get game by ID |
| POST | `/api/games` | Add a game |
| POST | `/api/payments/capture` | Capture a PayPal payment |
| GET | `/api/payments/logs` | Get all payment logs |
| GET | `/api/chat/product/{productId}` | Get chat messages for a product |
| DELETE | `/api/chat/clear` | Clear chat between buyer and seller |

WebSocket endpoint: `/ws` — subscribe to `/topic/public`, send to `/app/send`.
