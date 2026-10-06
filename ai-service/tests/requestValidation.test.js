const { validateRequest } = require("../src/utils/validateRequest");

function runMiddleware(name, body) {
    const req = { body };
    const response = {
        statusCode: null,
        payload: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.payload = payload;
        },
    };
    let nextCalled = false;

    validateRequest(name)(req, response, () => {
        nextCalled = true;
    });

    return { req, response, nextCalled };
}

describe("request validation", () => {
    it("rejects incomplete technical question requests with HTTP 400", () => {
        const result = runMiddleware("technicalQuestions", {});

        expect(result.nextCalled).toBe(false);
        expect(result.response.statusCode).toBe(400);
        expect(result.response.payload.success).toBe(false);
    });

    it("accepts a valid code submission request", () => {
        const result = runMiddleware("codeSubmission", {
            candidateCode: "console.log('ok')",
            testCases: [{ input: "", expectedOutput: "ok" }],
            programmingLanguage: "JavaScript",
            experienceLevel: "Junior",
            problemStatement: "Print ok.",
        });

        expect(result.nextCalled).toBe(true);
        expect(result.response.statusCode).toBeNull();
    });
});
