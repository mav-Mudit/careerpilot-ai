import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  const { loading, setLoading, report, setReport, reports, setReports } =
    context;
  const generateReport = async ({
    resumeFile,
    selfDescription,
    jobDescription,
  }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });
      setReport(response.interviewReport);
      return response.interviewReport; // ← move return inside try
    } catch (error) {
      console.log("Error generating interview report:", error);
      return null; // ← return null on failure
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport; // ← inside try
    } catch (error) {
      console.log("Error fetching interview report:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
      return response.interviewReports; // ← inside try
    } catch (error) {
      console.log("Error fetching interview reports:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
  };
};
