# Gender-Equality-Project

## 🌟 Problem Statement
Gender inequality remains a significant issue globally, affecting opportunities, wages, access to education, and representation. This project aims to create a [brief description of what your project will do, e.g., "web platform that showcases gender disparity data and resources for awareness and education"].

---

## 👥 Group Details

**Group Number:** 08

| Name         | Email                   | Registration Number | Roles                              |
|--------------|-------------------------|---------------------|-------------------------------------|
| Saradha J            | 2023lm70042@wilp.bits-pilani.ac.in| 2023lm70042      | PM, Technical Analyst,Tester                         |
| RAMA KRISHNAN M      | 2023lm70045@wilp.bits-pilani.ac.in| 2023lm70045      | User Researcher, Technical Analyst,Programmer        |



---

## 🛠️ Planned Roles

- **Project Manager (PM):** Saradha J
- **Tester:** Saradha J
- **User Researcher:** RAMA KRISHNAN M 
- **Programmer:** RAMA KRISHNAN M ,KRUNAL KRISHNA HALLUR
- **Technical Analyst:** KRUNAL KRISHNA HALLUR

---

## 📌 Project Goals

- Conduct user research to understand key gender-based issues
- Design a platform with informative visualizations and educational content
- Develop and test the platform using modern web technologies

---

## 📁 Folder Structure

- `/docs` – PRD, full documentation
- `/diagrams` – All system design diagrams 
- `/survey_responses` – Google Form result files

 ## Monorepo Structure
- `backend/` — Express API + SQLite (via better-sqlite3), with schema and seed utilities.
- `frontend/` — React app with pages for reporting, resources, and admin dashboard.

## Quick Start (Dev)
```bash
# Backend
cd backend
cp .env.example .env
npm install
npm run dev
# Frontend (in new terminal)
cd ../frontend
npm install
npm run dev
```

## API Endpoints
- `GET /api/health` (ping)
- `GET /api/reports` (list)
- `POST /api/reports` (create) `{ is_anonymous, category, description }`
- `GET /api/reports/:id` (detail)
- `PATCH /api/reports/:id` (update status)
- `GET /api/reports/:id/messages` (list messages)
- `POST /api/reports/:id/messages` (add message) `{ sender_role, message }`
- `GET /api/resources?kind=article|video|policy|helpline`
- `POST /api/resources` (create resource)

## Next Steps
- Add authentication for admin/counselor roles
- File uploads for evidence
- Email/SMS notifications
- Multi-language UI

