const axios = require("axios");

const BASE_URL = "http://localhost:5000";
const CONCURRENT_REQUESTS = 10;

const samplePayload = {
    candidateCode:
        "const readline = require('readline').createInterface({ input: process.stdin });\nlet input = '';\nreadline.on('line', (line) => input += line);\nreadline.on('close', () => {\n  const str = input.trim();\n  for (let i = 0; i < str.length; i++) {\n    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {\n      console.log(str[i]);\n      return;\n    }\n  }\n  console.log('null');\n});",
    testCases: [
        { input: "leetcode", expectedOutput: "l" },
        { input: "aabb", expectedOutput: "null" },
    ],
    programmingLanguage: "JavaScript",
    experienceLevel: "Junior",
    problemStatement: "Write a function that returns the first non-repeating character in a string.",
};

const runLoadTest = async () => {
    console.log(`Firing ${CONCURRENT_REQUESTS} concurrent submissions...`);
    const startTime = Date.now();

    const requests = Array.from({ length: CONCURRENT_REQUESTS }, (_, i) =>
        axios
            .post(`${BASE_URL}/api/submissions/execute`, samplePayload)
            .then((res) => ({ index: i, status: "success", data: res.data }))
            .catch((err) => ({ index: i, status: "error", error: err.message }))
    );

    const results = await Promise.all(requests);
    const totalTime = Date.now() - startTime;

    const successes = results.filter((r) => r.status === "success").length;
    const failures = results.filter((r) => r.status === "error");

    console.log(`\n--- Load Test Results ---`);
    console.log(`Total time: ${totalTime}ms`);
    console.log(`Successes: ${successes}/${CONCURRENT_REQUESTS}`);
    console.log(`Failures: ${failures.length}`);

    failures.forEach((f) => console.log(`  Request ${f.index} failed: ${f.error}`));
};

runLoadTest();
const requests = Array.from({ length: CONCURRENT_REQUESTS }, (_, i) =>
    axios
        .post(`${BASE_URL}/api/submissions/execute`, samplePayload)
        .then((res) => ({ index: i, status: "success", data: res.data }))
        .catch((err) => ({
            index: i,
            status: "error",
            error: err.response?.data?.error || err.message, // ← now grabs the real server error
        }))
);