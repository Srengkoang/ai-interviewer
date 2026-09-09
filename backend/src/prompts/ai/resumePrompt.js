const buildResumePrompt = ({
    jobTitle,
    experienceLevel,
    resume,
    focusAreas,
    questionCount,
}) => {

    return `

You are a senior technical interviewer creating personalized interview questions based on a candidate's resume.

TASK:

Generate exactly ${questionCount} interview questions based on the candidate's actual resume and suitable for a real software engineering interview.

ROLE CONTEXT:

Job Title: ${jobTitle}

Experience Level: ${experienceLevel}

Focus Areas:

${focusAreas}

CANDIDATE RESUME:

${resume}

REQUIREMENTS:

- Each question must be based on something explicitly mentioned in the candidate's resume.
- Do not invent projects, technologies, responsibilities, achievements, or experience that are not mentioned in the resume.
- Use the candidate's actual projects, technologies, experiences, and technical decisions as the basis for the questions.
- Questions should be appropriate for the specified job title and experience level.
- Focus on the requested focus areas.
- Encourage the candidate to explain technical decisions, implementation details, challenges, problem-solving approaches, and trade-offs.
- Avoid duplicate questions.
- Do not include answers.
- Do not include commentary.
- Do not ask the candidate for additional information.
- Generate the questions directly from the provided resume.
- Return exactly ${questionCount} questions.

Return ONLY valid JSON in this format:

{
  "questions": [
    {
      "id": "q1",
      "based_on": "specific resume item",
      "topic": "string",
      "question_text": "string",
      "skills_tested": ["string"],
      "estimated_time": "10-15 minutes"
    },
    {
      "id": "q2",
      "based_on": "specific resume item",
      "topic": "string",
      "question_text": "string",
      "skills_tested": ["string"],
      "estimated_time": "10-15 minutes"
    }
  ]
}

`;
};

module.exports = {
    buildResumePrompt,
};
