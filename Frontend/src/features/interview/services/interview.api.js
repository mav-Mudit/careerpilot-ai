import axios from "axios";

const api = axios.create({
  baseURL: "https://careerpilot-ai-backend-i3xo.onrender.com",
  withCredentials: true,
});

/**
 * @desc generate new interview report on the basis of the provided job description, candidate resume and user self description
 */

export const generateInterviewReport = async ({
  resumeFile,
  selfDescription,
  jobDescription,
}) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  const response = await api.post("/api/interview/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * @desc get interview report by interview id
 */

export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};

/**
 * @desc get all interview reports of the logged in user
 */

export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview/");
  return response.data;
};
