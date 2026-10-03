const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "InterviewAI API",
            version: "1.0.0",
            description:
                "AI-powered technical interview platform. Endpoints generate interview questions, evaluate candidate code via a Docker sandbox, provide feedback, and produce a final hiring report.",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local development server",
            },
        ],
        tags: [
            { name: "AI-001 Technical Questions" },
            { name: "AI-002 Resume Questions" },
            { name: "AI-003 Job Description Questions" },
            { name: "AI-004 Follow-up Questions" },
            { name: "AI-005 Code Evaluation" },
            { name: "AI-006 Answer Feedback" },
            { name: "AI-007 Final Report" },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };