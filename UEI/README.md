# Online Educational Interface

A full-stack online education platform built with **React.js + Spring Boot + MySQL**.

---

## Project Structure

```
UEI/
├── online-educational-interface-frontend/   ← React.js frontend
└── online-educational-interface-backend/    ← Spring Boot backend
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| Java JDK | 17+ |
| MySQL | 8.0+ |
| Maven | 3.8+ |

---

## 1. Database Setup

1. Open MySQL and create the database:
```sql
CREATE DATABASE education_db;
```

2. Open `application.properties` and update credentials:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

## 2. Run the Backend

```bash
cd online-educational-interface-backend
mvn spring-boot:run
```

Backend runs at: **http://localhost:8080**

On startup, default accounts are auto-created:
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | admin123 |
| Teacher | teacher@gmail.com | teacher123 |
| Student | student@gmail.com | student123 |

---

## 3. Run the Frontend

```bash
cd online-educational-interface-frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## Pages

### Public
- `/` — Home page
- `/login` — Login
- `/register` — Register

### Admin
- `/admin` — Dashboard (stats)
- `/admin/users` — Manage users
- `/admin/reports` — Platform reports

### Teacher
- `/teacher` — Dashboard
- `/teacher/courses` — Manage courses
- `/teacher/materials` — Upload study materials
- `/teacher/assignments` — Create assignments
- `/teacher/quizzes` — Create quizzes
- `/teacher/submissions` — View & grade submissions

### Student
- `/student` — Dashboard
- `/student/courses` — Browse & enroll in courses
- `/student/courses/:id` — Course detail
- `/student/materials/:id` — Study materials
- `/student/assignments/:id` — Assignments
- `/student/quizzes/:id` — Take quizzes
- `/student/results` — View marks & quiz scores
- `/student/announcements` — Course announcements

---

## API Base URL

All API calls go to `http://localhost:8080/api/...`

JWT token is stored in `localStorage` and attached as `Authorization: Bearer <token>` on every request.

---

## Tech Stack

- **Frontend**: React 18, React Router 6, Axios, Bootstrap 5
- **Backend**: Spring Boot 3, Spring Security, Spring Data JPA, JWT
- **Database**: MySQL 8 (easily switchable to PostgreSQL or MongoDB)
