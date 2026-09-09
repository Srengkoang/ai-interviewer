const { runInSandbox } = require("./dockerRunner");

const evaluateSubmission = async (code, testCases, programmingLanguage = "javascript") => {
    const results = [];

    for (const [index, testCase] of testCases.entries()) {
        const { stdout, stderr, timedOut, exitCode } = await runInSandbox(
            code,
            testCase.input,
            programmingLanguage
        );

        const actualOutput = stdout.trim();
        const expectedOutput = testCase.expectedOutput.trim();

        let status;
        if (timedOut) {
            status = "timeout";
        } else if (stderr) {
            status = "runtime_error";
        } else if (actualOutput === expectedOutput) {
            status = "passed";
        } else {
            status = "failed";
        }

        results.push({
            testCaseNumber: index + 1,
            status,
            expectedOutput,
            actualOutput,
            stderr: stderr || null,
        });
    }

    const passedCount = results.filter((r) => r.status === "passed").length;
    const executionResult = buildExecutionResultSummary(results, passedCount, testCases.length);

    console.log("RAW EXECUTION RESULT:", executionResult);

    return {
        results,
        passedCount,
        totalCount: testCases.length,
        executionResult,
    };
};

const buildExecutionResultSummary = (results, passedCount, totalCount) => {
    const lines = [`${passedCount}/${totalCount} test cases passed.`];

    const failures = results.filter((r) => r.status !== "passed");
    for (const failure of failures) {
        if (failure.status === "timeout") {
            lines.push(`Test case ${failure.testCaseNumber}: timed out (possible infinite loop).`);
        } else if (failure.status === "runtime_error") {
            lines.push(`Test case ${failure.testCaseNumber}: runtime error - ${failure.stderr}`);
        } else {
            lines.push(
                `Test case ${failure.testCaseNumber}: expected "${failure.expectedOutput}", got "${failure.actualOutput}".`
            );
        }
    }

    return lines.join(" ");
};

const isInfrastructureFailure = (results) => {
    if (results.length === 0) return false;

    const allFailed = results.every((r) => r.status === "runtime_error");
    if (!allFailed) return false;

    const infraKeywords = ["docker", "daemon", "npipe", "connect", "ENOENT", "engine"];
    return results.every((r) =>
        infraKeywords.some((keyword) =>
            (r.stderr || "").toLowerCase().includes(keyword.toLowerCase())
        )
    );
};

module.exports = { evaluateSubmission, isInfrastructureFailure };