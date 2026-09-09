class ExecutionQueue {
    constructor(maxConcurrent = 5) {
        this.maxConcurrent = maxConcurrent;
        this.runningCount = 0;
        this.queue = [];
    }

    run(task) {
        return new Promise((resolve, reject) => {
            const attemptRun = () => {
                this.runningCount += 1;
                task()
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
                        this.runningCount -= 1;
                        this._processNext();
                    });
            };

            if (this.runningCount < this.maxConcurrent) {
                attemptRun();
            } else {
                this.queue.push(attemptRun);
            }
        });
    }

    _processNext() {
        if (this.queue.length === 0) return;
        if (this.runningCount >= this.maxConcurrent) return;
        const nextTask = this.queue.shift();
        nextTask();
    }

    getStatus() {
        return { running: this.runningCount, queued: this.queue.length, maxConcurrent: this.maxConcurrent };
    }
}

const sandboxQueue = new ExecutionQueue(5);
const aiQueue = new ExecutionQueue(1); // only 1 Groq call in flight at a time

module.exports = { sandboxQueue, aiQueue };