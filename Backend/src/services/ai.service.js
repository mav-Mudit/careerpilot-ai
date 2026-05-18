const OpenAI = require("openai");

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const responseSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    matchScore: { type: "number" },
    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
      },
    },
    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
      },
    },
    skillGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: { type: "string" },
          severity: { type: "string", enum: ["low", "medium", "high"] },
        },
      },
    },
    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: { type: "number" },
          focus: { type: "string" },
          tasks: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const trimmedResume = resume.replace(/\s+/g, " ").trim().slice(0, 6000);

  const prompt = `You are a senior technical interviewer with 10 years of experience.
Carefully read the candidate's FULL resume and generate highly specific interview questions
based on their ACTUAL projects, technologies and experience mentioned.

Do NOT generate generic questions. Every technical question must reference something
specific from their resume — a project name, a technology they used, or a decision they made.

Return a pure JSON object with exactly these fields:
- title: short job title string, maximum 10 words
- matchScore: number between 0-100
- technicalQuestions: array of exactly 5 objects with question, intention, answer
- behavioralQuestions: array of exactly 3 objects with question, intention, answer
- skillGaps: array of objects with skill and severity (low/medium/high)
- preparationPlan: array of exactly 5 objects with day, focus, tasks array (max 2 tasks per day)

Resume: ${trimmedResume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;

  try {
    const response = await ai.chat.completions.create({
      model: "gpt-5.4",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }, // ← simpler, more reliable
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    return parsed;
  } catch (err) {
    console.error("OpenAI response parsing failed:", err.message);
    throw new Error("AI response parsing failed — please try again");
  }
}

module.exports = generateInterviewReport;
