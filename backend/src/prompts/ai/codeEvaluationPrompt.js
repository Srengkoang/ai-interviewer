const buildCodeEvaluationPrompt = ({
    programmingLanguage,
    experienceLevel,
    problemStatement,
    candidateCode,
    executionResult,
    testCasesTested,
}) => {
    return `
You are a senior technical interviewer reviewing a candidate's code submission.

TASK:
Evaluate the candidate's code against the problem statement and the sandbox execution results provided below.

CONTEXT:
Programming Language: ${programmingLanguage}

Experience Level: ${experienceLevel}

PROBLEM STATEMENT:
${problemStatement}

INPUT METHOD:
The candidate's code reads input from standard input (stdin) and writes output via standard output (stdout). This is the expected and correct approach for this platform — do not penalize the candidate for using stdin/stdout instead of a function signature, and do not suggest rewriting the code to accept a function parameter instead.

CANDIDATE CODE:
${candidateCode}

SANDBOX EXECUTION RESULT:
${executionResult}

TEST CASE INPUTS ACTUALLY EXECUTED:
${testCasesTested.map((input, i) => `Test ${i + 1}: ${input === "" ? "(empty string)" : input}`).join("\n")}

INFRASTRUCTURE FAILURE CHECK:
Before evaluating the code, check whether the sandbox execution result indicates an infrastructure or environment failure — for example, errors mentioning a connection failure, a missing daemon/engine, "docker" not being found or reachable, permission errors, or any error that describes the execution system itself failing rather than the candidate's program producing incorrect output.

If such an infrastructure failure is present, you MUST NOT evaluate or score the candidate's code. Instead, return exactly this JSON, substituting nothing:

{
  "score": 0,
  "correctness": "fail",
  "time_complexity_estimate": "unknown",
  "space_complexity_estimate": "unknown",
  "strengths": [],
  "weaknesses": [],
  "edge_cases_missed": [],
  "code_feedback": "Evaluation could not be completed due to a sandbox infrastructure failure, not a fault in the candidate's code. This submission should be re-run once the execution environment is available."
}

Only proceed to the evaluation below if the execution result reflects a genuine run of the candidate's code (whether it passed, partially passed, or failed due to the code's own logic).

EVALUATION CRITERIA:
- Correctness: Does the code solve the problem and pass the provided test cases?
  - "pass": ALL test cases pass with no known edge case failures.
  - "partial": Most test cases pass, but at least one edge case or test case fails.
  - "fail": The core logic is incorrect, or most test cases fail.
- Code Quality: Is the code readable and reasonably structured for the language?
- Efficiency: Is the time/space complexity reasonable for the problem size?
- Edge Case Handling: Does the code account for edge cases (empty input, nulls, boundary values)?
- Weight correctness and edge case handling most heavily; do not penalize minor style preferences.

SCORING GUIDANCE:
- Score should reflect overall quality on a 0-100 scale, consistent with the correctness rating:
  - "pass" typically scores 85-100.
  - "partial" typically scores 50-84.
  - "fail" typically scores 0-49.

REQUIREMENTS:
- Base your evaluation only on the code and sandbox execution result provided.
- Do not assume behavior that was not shown in the execution result.
- "edge_cases_missed" must ONLY reference inputs that appear in "TEST CASE INPUTS ACTUALLY EXECUTED" above AND that the execution result shows as failed. Do not reference any input, scenario, or edge case that is not explicitly listed there — even if it seems like a reasonable thing to test. If every listed test case passed, return an empty array for edge_cases_missed.

Return ONLY valid JSON in this format:

{
  "score":0,
  "correctness":"pass",
  "time_complexity_estimate":"string",
  "space_complexity_estimate":"string",
  "strengths":["string"],
  "weaknesses":["string"],
  "edge_cases_missed":["string"],
  "code_feedback":"string"
}
`;
};

module.exports = {
    buildCodeEvaluationPrompt,
};