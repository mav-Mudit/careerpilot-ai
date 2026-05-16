const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model");
async function generateInterviewReportController(req, res) {
    const resumeFile = req.file; // Access the uploaded resume file

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText() // Parse the PDF content
    const {selfDescription, jobDescription} = req.body; // Access the self description and job description from the request body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
       ...interviewReportByAi
    })
    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
}

module.exports = { generateInterviewReportController };
