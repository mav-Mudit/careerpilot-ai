# CareerPilot AI

A full-stack GenAI-powered job preparation platform built with the MERN stack and OpenAI GPT-4o. Upload your resume, paste a job description, and receive a personalized interview strategy — including skill gap analysis, match scoring, technical and behavioral questions, and a day-wise preparation roadmap.

---

## Features

- JWT authentication with secure HTTP-only cookies
- PDF resume upload and text extraction
- AI-powered interview report generation via OpenAI GPT-4o
- Match score between candidate profile and job description
- Skill gap detection with severity levels (low / medium / high)
- Tailored technical and behavioral interview questions
- Personalized day-wise preparation roadmap
- Dashboard showing all past interview reports

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, React Router DOM, Axios, SCSS |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs |
| AI & Files | OpenAI GPT-5.4, Multer, pdf-parse |

---

## Project Structure

```
careerpilot/
├── backend/
│   ├── src/
│   │   ├── config/             # Database connection
│   │   ├── controllers/        # Route handler logic
│   │   ├── middleware/          # Auth and file upload middleware
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API route definitions
│   │   └── services/           # OpenAI integration
│   └── server.js               # Express app entry point
└── frontend/
    └── src/
        ├── features/
        │   ├── auth/
        │   │   ├── components/       # Reusable auth components
        │   │   ├── hooks/            # useAuth custom hook
        │   │   ├── pages/            # Login, Register
        │   │   ├── services/         # Auth API calls
        │   │   └── auth.context.jsx  # Auth context provider
        │   └── interview/
        │       ├── context/          # Interview context provider
        │       ├── hooks/            # useInterview custom hook
        │       ├── pages/            # Home, Interview
        │       └── services/         # Interview API calls
        ├── app.routes.jsx            # Route definitions
        ├── app.jsx                   # App root
        └── main.jsx                  # Entry point
```

---

## API Reference

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/logout` | Logout user | Private |
| GET | `/api/auth/get-me` | Get logged in user | Private |
| POST | `/api/interview` | Generate interview report | Private |
| GET | `/api/interview` | Get all interview reports | Private |
| GET | `/api/interview/report/:id` | Get interview report by ID | Private |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- OpenAI API key

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/mav-Mudit/careerpilot-ai.git
cd careerpilot-ai
```

**2. Setup backend**

```bash
cd backend
npm install
cp .env.example .env
```

Add your credentials to `.env`:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

```bash
npm run dev
```

**3. Setup frontend**

```bash
cd frontend
npm install
npm run dev
```

**4. Open in browser**

```
http://localhost:5173
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o |

---

## License

MIT