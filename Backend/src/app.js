const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

// ✅ CORS (no credentials needed anymore)
app.use(
  cors({
    origin: "https://careerpilot-ai-blond.vercel.app",
  })
);

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
