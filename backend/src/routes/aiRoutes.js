const express = require("express");
const router = express.Router();

const { 
    generateQuestions,
    generateResumeInterviewQuestions,
    generateJobDescriptionQuestions,
    generateFollowUpQuestions,
    generateFeedback,
    generateFinalReport,
    generateCodeEvaluation,
} = require("../controllers/aiController");

router.post("/questions", generateQuestions);
router.post("/resume-questions", generateResumeInterviewQuestions);
router.post("/job-description-questions", generateJobDescriptionQuestions);
router.post("/follow-up-questions", generateFollowUpQuestions);
router.post("/feedback", generateFeedback);
router.post("/code-evaluation", generateCodeEvaluation);
router.post("/final-report", generateFinalReport);
module.exports = router;
