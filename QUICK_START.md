# 🚀 UEI — Quick Start Guide

Get the Unified Education Interface running in 5 minutes.

---

## Prerequisites

Before starting, ensure you have:
- ✅ **Docker** and **Docker Compose** installed
- ✅ **Node.js** 18+ (for local frontend development)
- ✅ **Java JDK** 17+ (for local backend development)
- ✅ **Python** 3.11+ (for local AI service development)
- ✅ **PostgreSQL** 15+ (if running without Docker)
- ✅ **Maven** 3.8+ (if running backend without Docker)

---

## 🎯 Option 1: Docker (Recommended) — All Services at Once

**The fastest way to run the entire stack:**

```bash
# Navigate to project
cd UEI

# Start all services (Postgres, Backend, AI Service, Frontend)
docker-compose up --build
```

### Service URLs
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8080
- 🤖 **AI Service**: http://localhost:8001
- 🗄️ **PostgreSQL**: localhost:5432

### Demo Accounts
| Role              | Email                  | Password  |
|-------------------|------------------------|-----------|
| Student           | student@uei.gov.in     | Demo@1234 |
| Teacher           | teacher@uei.gov.in     | Demo@1234 |
| Institution Admin | admin@uei.gov.in       | Demo@1234 |
| Government Admin  | govt@uei.gov.in        | Demo@1234 |

**⚠️ Note:** First run will take 5-10 minutes for builds. Subsequent runs are faster.

---

## 🛠️ Option 2: Manual Setup (Development Mode)

### Step 1: Database

```bash
# Start PostgreSQL (using Docker)
docker run --name uei-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15

# Create database and run schema
psql -U postgres -h localhost
CREATE DATABASE uei_db;
\q

psql -U postgres -h localhost -d uei_db -f database/schema.sql
```

### Step 2: Backend (Spring Boot)

```bash
cd backend

# Option A: Using Maven
mvn spring-boot:run

# Option B: Using system Maven (if mvnw not available)
mvn clean install
mvn spring-boot:run
```

Backend runs on: **http://localhost:8080**

**Swagger API Docs**: http://localhost:8080/swagger-ui.html

### Step 3: AI Service (Python FastAPI)

```bash
cd ai-service

# Create virtual environment
python -m venv venv

# Activate
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run service
uvicorn main:app --reload --port 8001
```

AI Service runs on: **http://localhost:8001**

**API Docs**: http://localhost:8001/docs

### Step 4: Frontend (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs on: **http://localhost:3000**

---

## 🧪 Testing the Application

### 1. Visit Landing Page
Open http://localhost:3000

### 2. Login as Student
- Email: `student@uei.gov.in`
- Password: `Demo@1234`

### 3. Explore Features
- ✅ View attendance (subject-wise)
- ✅ Check results with charts
- ✅ AI scholarship recommendations
- ✅ Digital certificates
- ✅ Career guidance
- ✅ Chat with AI assistant

### 4. Test Different Roles
Logout and login with:
- **Teacher** → Mark attendance, enter marks
- **Admin** → Manage students, view analytics
- **Government** → National dashboard with real-time graphs

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check connection
psql -U postgres -h localhost
```

### Backend Won't Start
```bash
# Check Java version
java -version  # Should be 17+

# Check Maven
mvn -version

# Check logs
cd backend
mvn spring-boot:run
```

### Frontend Shows 404 or Blank
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### AI Service Import Errors
```bash
# Reinstall with compatible versions
cd ai-service
pip install --upgrade pip
pip install -r requirements.txt
```

### Port Already in Use
```bash
# Check what's using the port (e.g., 8080)
# On Windows:
netstat -ano | findstr :8080

# On Linux/Mac:
lsof -i :8080

# Kill the process or change port in application.yml
```

---

## 📖 Next Steps

- Read **[INSTALLATION.md](docs/INSTALLATION.md)** for detailed setup
- Check **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** for system design
- View **API Documentation** at http://localhost:8080/swagger-ui.html
- Explore **AI endpoints** at http://localhost:8001/docs

---

## 🎓 Features by Role

### Student Portal
- Dashboard with charts (attendance, marks trends)
- Subject-wise attendance tracking
- Semester results with filtering
- AI-powered scholarship recommendations
- Digital certificates with QR verification
- AI career guidance (jobs, higher studies, exams)
- Conversational AI chatbot

### Teacher Portal
- Class schedule dashboard
- Bulk attendance marking
- Marks entry with auto-grading
- Student performance analytics

### Institution Admin
- Institution overview dashboard
- Student management (CRUD, search, filter)
- Department-wise analytics
- Certificate generation
- Reports

### Government Dashboard
- National education KPIs
- State-wise analytics
- Enrollment trends (5-year charts)
- Dropout rate monitoring
- Gender ratio analysis
- Placement statistics
- Institution performance rankings

---

## 🔒 Security Notes

- JWT tokens expire after 24 hours
- Refresh tokens valid for 7 days
- All passwords stored as BCrypt hashes
- Role-based access control enforced
- Audit logs track all critical actions
- CORS restricted to frontend origin

---

## 🆘 Need Help?

- **Documentation**: Check `docs/` folder
- **Issues**: Review `PROJECT_VERIFICATION.md`
- **API Reference**: http://localhost:8080/swagger-ui.html
- **Build Notes**: See `backend/BUILD_NOTES.md`

---

## ✅ Verification Checklist

Run through this checklist to verify your setup:

- [ ] PostgreSQL running on port 5432
- [ ] Backend API responds at http://localhost:8080/actuator/health
- [ ] AI Service responds at http://localhost:8001
- [ ] Frontend loads at http://localhost:3000
- [ ] Can login with demo credentials
- [ ] Dashboard shows charts and data
- [ ] Can navigate between different roles
- [ ] API calls return data (check browser DevTools Network tab)

If all checks pass: **🎉 You're ready to go!**

---

**Built with ❤️ for Smart India Hackathon**
