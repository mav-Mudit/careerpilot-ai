# CareerPilot AI 🚀

A full-stack GenAI-powered job preparation platform built using the MERN stack and OpenAI. Users can upload their resumes, analyze job descriptions, detect skill gaps, and receive AI-generated interview questions with a personalized preparation plan.

## Features

- JWT-based authentication with secure HTTP-only cookies
- PDF resume upload and parsing
- AI-powered interview report generation using OpenAI GPT-4o
- Skill gap detection with severity levels
- Personalized day-wise preparation roadmap
- Technical and behavioral interview questions tailored to the job description
- Match score between candidate profile and job description

## Tech Stack

**Frontend**

- React
- React Router DOM
- Axios
- SCSS

**Backend**

- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs
- JSON Web Tokens (JWT)

**AI & File Handling**

- OpenAI (gpt-5.4)
- Multer (PDF upload)
- pdf-parse (PDF text extraction)

**Validation**

- Zod

## Project Structure

```
careerpilot/
├── backend/
│   ├── src/
│   │   ├── config/             # DB connection
│   │   ├── controllers/        # Route handlers
│   │   ├── middleware/          # Auth, Multer
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API endpoints
│   │   └── services/           # OpenAI logic
│   └── server.js
└── frontend/
    └── src/
        ├── features/
        │   ├── auth/
        │   │   ├── components/       # Reusable auth components
        │   │   ├── hooks/            # useAuth custom hook
        │   │   ├── pages/            # Login, Register
        │   │   ├── services/         # Auth API calls
        │   │   └── auth.context.jsx  # Auth context
        │   └── interview/
        │       ├── context/          # Interview context
        │       ├── hooks/            # useInterview custom hook
        │       ├── pages/            # Home, Interview
        │       └── services/         # Interview API calls
        ├── app.routes.jsx            # Route definitions
        ├── app.jsx                   # App root
        └── main.jsx                  # Entry point
```

## API Endpoints

| Method | Endpoint                  | Description                | Access  |
| ------ | ------------------------- | -------------------------- | ------- |
| POST   | /api/auth/register        | Register a new user        | Public  |
| POST   | /api/auth/login           | Login user                 | Public  |
| GET    | /api/auth/logout          | Logout user                | Private |
| GET    | /api/auth/get-me          | Get logged in user         | Private |
| POST   | /api/interview            | Generate interview report  | Private |
| GET    | /api/interview            | Get all interview reports  | Private |
| GET    | /api/interview/report/:id | Get interview report by ID | Private |

## Getting Started

**Clone the repository**

```bash
git clone https://github.com/your-username/careerpilot-ai.git
cd careerpilot-ai
```

**Setup backend**

```bash
cd backend
npm install
cp .env.example .env
# Add your MONGODB_URI, JWT_SECRET and OPENAI_API_KEY to .env
npm run dev
```

**Setup frontend**

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```
