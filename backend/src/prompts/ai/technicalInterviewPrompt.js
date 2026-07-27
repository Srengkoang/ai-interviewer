const buildTechnicalInterviewPrompt = ({
    jobTitle,
    experienceLevel,
    techStack,
    difficulty,
    questionType,
    questionCount,
}) => {
    return `
You are a senior technical interviewer creating interview questions for a live candidate assessment.

TASK:
Generate exactly ${questionCount} interview questions suitable for a real software engineering interview.

ROLE CONTEXT:
Job Title: ${jobTitle}

Experience Level: ${experienceLevel}

Tech Stack:
${techStack.map(skill => `- ${skill}`).join("\n")}

Difficulty:
${difficulty}

Question Type:
${questionType}

Return ONLY valid JSON in this format:

{
  "questions":[
    {
      "id":"q1",
      "type":"theoretical",
      "topic":"string",
      "difficulty":"medium",
      "skills":["string"],
      "estimated_time":"10-15 minutes",
      "question_text":"string"
    }
  ]
}
`;
};

module.exports = {
    buildTechnicalInterviewPrompt,
};