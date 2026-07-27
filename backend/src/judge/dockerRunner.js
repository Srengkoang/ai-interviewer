const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { randomUUID } = require("crypto");

const EXECUTION_TIMEOUT_MS = 15000; // temporarily raised from 5000 to rule out cold-start delay
const MEMORY_LIMIT = "128m";
const CPU_LIMIT = "0.5";

/**
 * Runs candidate JavaScript code inside an isolated Docker container.
 *
 * @param {string} code - the candidate's raw code
 * @param {string} input - stdin to feed the program (if any)
 * @returns {Promise<{stdout: string, stderr: string, timedOut: boolean, exitCode: number|null}>}
 */
const runInSandbox = (code, input = "") => {
    return new Promise((resolve) => {
        const runId = randomUUID();
        const tempDir = path.join(os.tmpdir(), `sandbox-${runId}`);
        fs.mkdirSync(tempDir);

        const codeFilePath = path.join(tempDir, "solution.js");
        fs.writeFileSync(codeFilePath, code);

        const inputFilePath = path.join(tempDir, "input.txt");
        fs.writeFileSync(inputFilePath, input);

        const dockerCommand = [
            "docker run --rm",
            `--network none`,
            `--memory=${MEMORY_LIMIT}`,
            `--cpus=${CPU_LIMIT}`,
            `-v "${tempDir}:/sandbox:ro"`,
            `node:20-alpine`,
            `sh -c "node /sandbox/solution.js < /sandbox/input.txt"`,
        ].join(" ");

        const child = exec(
            dockerCommand,
            { timeout: EXECUTION_TIMEOUT_MS },
            (error, stdout, stderr) => {
                fs.rmSync(tempDir, { recursive: true, force: true });

                const timedOut = error && error.killed;

                resolve({
                    stdout: stdout || "",
                    stderr: stderr || "",
                    timedOut: !!timedOut,
                    exitCode: error ? error.code : 0,
                });
            }
        );
    });
};


module.exports = { runInSandbox };