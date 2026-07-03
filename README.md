# Unified Education Interface (UEI)
## Smart India Hackathon (SIH) Project

> A centralized digital platform connecting Students, Teachers, Institutions, Universities, and Government into a single education ecosystem.

---

## 🏗️ Architecture Overview

```
UEI/
├── frontend/          # React + TypeScript + Tailwind CSS
├── backend/           # Java Spring Boot REST API
├── ai-service/        # Python FastAPI + ML Models
├── database/          # PostgreSQL Schema & Migrations
├── docs/              # Architecture, ER, API Documentation
└── deployment/        # Docker, Docker Compose, AWS configs
```

---

## 🚀 Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18, TypeScript, Tailwind CSS, ShadCN UI  |
| Backend    | Java 17, Spring Boot 3, JWT, Hibernate/JPA      |
| AI Service | Python 3.11, FastAPI, Scikit-learn, TensorFlow  |
| Database   | PostgreSQL 15                                   |
| Deployment | Docker, Docker Compose, AWS ECS/RDS             |

---

## 👥 User Roles

1. **Student** – Dashboard, Attendance, Results, Scholarships, Certificates, AI Career Guidance
2. **Teacher** – Student Management, Attendance, Marks Entry, Analytics
3. **Institution Admin** – Full institution management, Reports
4. **University Admin** – College monitoring, Affiliation, Audit
5. **Government Admin** – State/District analytics, Policy dashboard

---

## 🤖 AI Modules

- **Dropout Prediction** – Risk classification (Low/Medium/High)
- **Scholarship Recommendation** – Personalized scholarship matching
- **Career Guidance** – Job/higher study/exam recommendations
- **AI Chatbot** – FAQ answering for students
- **Analytics Prediction** – Pass %, placement rate trends

---

## 🔐 Security

- JWT Authentication with refresh tokens
- Role-Based Access Control (RBAC)
- BCrypt password encryption
- Audit logs for all critical actions
- Input validation & rate limiting
- HTTPS enforced in production

---

## 📦 Quick Start

### Prerequisites
- Node.js 18+, Java 17+, Python 3.11+, PostgreSQL 15+, Docker

### 1. Database Setup
```bash
cd database
psql -U postgres -f schema.sql
psql -U postgres -f seed.sql
```

### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 3. AI Service
```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

### 4. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 5. Docker (All Services)
```bash
docker-compose up --build
```

---

## 📡 API Documentation

- Backend API: `http://localhost:8080/swagger-ui.html`
- AI Service API: `http://localhost:8001/docs`

---

## 🌐 Default Ports

| Service    | Port  |
|------------|-------|
| Frontend   | 3000  |
| Backend    | 8080  |
| AI Service | 8001  |
| PostgreSQL | 5432  |

---

## 📄 License
Government of India — Open Source Initiative
