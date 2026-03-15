# Billing Engine

A production-ready, event-driven billing system that processes billing events, generates invoices, and manages billing periods with reliability and scalability.

---

## What It Does

- Receives and processes billing events (API calls, storage usage, transactions)
- Automatically generates monthly invoices for customers
- Publishes events to external systems via AWS SQS
- Ensures reliable event delivery using the Transactional Outbox Pattern
- Closes billing periods automatically

---

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- AWS Account (for SQS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aladaabdul/billing-engine.git
   cd billing-engine
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start services**
   ```bash
   docker-compose up -d
   ```

The API is now running on `http://127.0.0.1:8000`

---

### Health Check

```bash
GET /health
```

---

## Tech Stack

- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Queue**: AWS SQS, BullMQ + Redis
- **Validation**: Zod

---


### Services

- **billing-api**: Main API server (port 8000)
- **publish-worker**: Publishes events from outbox to SQS
- **consumer-worker**: Processes SQS messages and creates invoices
- **billing-worker**: Closes billing periods (BullMQ)
- **postgres**: Database
- **redis**: Cache and BullMQ backend


---

### Local Development

```bash
npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```