const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true, coerceTypes: true });

const nonEmptyString = { type: "string", minLength: 1 };
const questionCount = { type: "integer", minimum: 1, maximum: 10 };

const schemas = {
    technicalQuestions: {
        type: "object",
        required: ["jobTitle", "experienceLevel", "techStack", "difficulty", "questionType", "questionCount"],
        properties: {
            jobTitle: nonEmptyString,
            experienceLevel: nonEmptyString,
            techStack: { type: "array", minItems: 1, items: nonEmptyString },
            difficulty: nonEmptyString,
            questionType: nonEmptyString,
            questionCount,
        },
        additionalProperties: true,
    },
    resumeQuestions: {
        type: "object",
        required: ["jobTitle", "experienceLevel", "resume", "focusAreas", "questionCount"],
        properties: {
            jobTitle: nonEmptyString,
            experienceLevel: nonEmptyString,
            resume: nonEmptyString,
            focusAreas: nonEmptyString,
            questionCount,
        },
        additionalProperties: true,
    },
    jobDescriptionQuestions: {
        type: "object",
        required: ["jobDescription", "experienceLevel", "questionType", "questionCount"],
        properties: {
            jobDescription: nonEmptyString,
            experienceLevel: nonEmptyString,
            questionType: nonEmptyString,
            questionCount,
        },
        additionalProperties: true,
    },
    followUpQuestions: {
        type: "object",
        required: ["jobTitle", "experienceLevel", "conversationHistory", "originalQuestion", "candidateAnswer"],
        properties: {
            jobTitle: nonEmptyString,
            experienceLevel: nonEmptyString,
            conversationHistory: { type: "string" },
            originalQuestion: nonEmptyString,
            candidateAnswer: nonEmptyString,
        },
        additionalProperties: true,
    },
    feedback: {
        type: "object",
        required: ["jobTitle", "experienceLevel", "question", "idealAnswerCriteria", "candidateAnswer"],
        properties: {
            jobTitle: nonEmptyString,
            experienceLevel: nonEmptyString,
            question: nonEmptyString,
            idealAnswerCriteria: nonEmptyString,
            candidateAnswer: nonEmptyString,
        },
        additionalProperties: true,
    },
    finalReport: {
        type: "object",
        required: ["candidateName", "jobTitle", "experienceLevel", "interviewTranscript", "perQuestionFeedback", "codeEvaluations"],
        properties: {
            candidateName: nonEmptyString,
            jobTitle: nonEmptyString,
            experienceLevel: nonEmptyString,
            interviewTranscript: nonEmptyString,
            perQuestionFeedback: { type: "array", items: { type: "object" } },
            codeEvaluations: { type: "array", items: { type: "object" } },
        },
        additionalProperties: true,
    },
    codeSubmission: {
        type: "object",
        required: ["candidateCode", "testCases", "programmingLanguage", "experienceLevel", "problemStatement"],
        properties: {
            candidateCode: { type: "string" },
            testCases: {
                type: "array",
                minItems: 1,
                maxItems: 100,
                items: {
                    type: "object",
                    required: ["input", "expectedOutput"],
                    properties: {
                        input: { type: "string" },
                        expectedOutput: { type: "string" },
                    },
                    additionalProperties: false,
                },
            },
            programmingLanguage: { enum: ["JavaScript", "javascript", "JS", "Node", "Python", "python", "Py"] },
            experienceLevel: nonEmptyString,
            problemStatement: nonEmptyString,
        },
        additionalProperties: true,
    },
};

const validators = Object.fromEntries(
    Object.entries(schemas).map(([name, schema]) => [name, ajv.compile(schema)]),
);

function validateRequest(name) {
    return (req, res, next) => {
        const validate = validators[name];
        const valid = validate(req.body);

        if (valid) {
            next();
            return;
        }

        const details = validate.errors
            .map((error) => `${error.instancePath || "(body)"} ${error.message}`)
            .join("; ");
        res.status(400).json({
            success: false,
            error: `Invalid request: ${details}`,
        });
    };
}

module.exports = { validateRequest };
