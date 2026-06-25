# Retro Arcade Marketplace — Backend

REST API and WebSocket server for the Retro Arcade Marketplace. Handles game listings, PayPal payment capture, and real-time buyer-seller chat.

## Tech Stack

- Java 17
- Spring Boot 3
- Spring Data JPA
- Spring WebSocket (STOMP)
- PostgreSQL
- Lombok

## Features

- Game catalog API (list, add, fetch by ID)
- PayPal payment capture and transaction logging
- Real-time product chat via WebSockets (persisted in PostgreSQL)
- Admin endpoint to view all payment logs

## Getting Started

### Prerequisites

- Java 17+
- Maven
- PostgreSQL running locally

### Database Setup

Create a database named `retro_arcade` in PostgreSQL:

```sql
CREATE DATABASE retro_arcade;
```

### Environment Variables

Set the following before running:

```bash
export DB_PASSWORD=your_postgres_password
```

Optionally override the URL and username (defaults shown):

```bash
export DB_URL=jdbc:postgresql://localhost:5432/retro_arcade
export DB_USERNAME=postgres
```

### Run Locally

```bash
./mvnw spring-boot:run
```

Server runs at `http://localhost:8080`.

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
