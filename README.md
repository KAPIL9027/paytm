# 💸 Paytm- Full Stack Payment Application

A production-grade, Paytm-inspired full stack payment application built using modern web technologies. It enables users to securely add money to their wallet, transfer money to other users via phone numbers, and view recent transactions on a sleek dashboard. The system includes real-time transaction processing with webhook integration and is deployed using Docker and CI/CD pipelines to an Azure Virtual Machine.

---

## 🚀 Features

- 💳 **Wallet System**  
  - Add money to wallet via simulated bank server
  - Send/receive money to/from other users using their phone number
  - View transaction history and current wallet balance

- 🧑‍💼 **Authentication**  
  - Secure login and signup using **NextAuth.js**
  - User sessions with JWT-based authentication

- 📊 **Modern Dashboard**  
  - Responsive UI to view wallet details and transactions
  - Built using **TailwindCSS** and React components

- 🔁 **Webhook Integration**  
  - Real-time confirmation of transactions from bank to webhook server
  - Secure handling of funds with proper API and DB update flow

- 🧠 **Smart Backend Logic**  
  - Simulated **bank server** processes deduction requests
  - **Webhook server** listens for transaction confirmation and updates the wallet accordingly

---

## 🧱 Tech Stack

**Frontend:**
- Next.js
- Redux Toolkit
- TailwindCSS
- NextAuth

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

**DevOps & Deployment:**
- Docker
- GitHub Actions (CI/CD)
- Azure Virtual Machine

**Monorepo Setup:**
- Turborepo
- Shared packages: `db`, `ui`, `tailwind`

---

## Demo Walkthrough Video



