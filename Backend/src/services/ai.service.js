const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
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
  const prompt = `You are an expert technical interviewer. Analyze the candidate profile below and generate a structured interview report.

You MUST return a pure JSON object. Do NOT use @ symbols, backticks, or any separators. Return clean JSON only with these exact fields:
- - title: short job title string, maximum 10 words, e.g. "Mid-Level Full Stack Engineer"
- matchScore: number between 0-100
- technicalQuestions: array of objects with question, intention, answer
- behavioralQuestions: array of objects with question, intention, answer
- skillGaps: array of objects with skill and severity (low/medium/high)
- preparationPlan: array of objects with day, focus, tasks array

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const raw = response.text.trim();
  const parsed = JSON.parse(raw);
  return parsed;
}

module.exports = generateInterviewReport;
