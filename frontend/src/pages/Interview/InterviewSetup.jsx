import React, { useState } from 'react'

const InterviewSetup = () => {

  const [jobRole, setJobRole] = useState("")
  const [interviewType, setInterviewType] = useState("")
  const [difficulty, setDifficulty] = useState("")


  const handleStartInterview = () => {
    console.log({
      jobRole,
      interviewType,
      difficulty
    })

    // later:
    // navigate("/interview-session")
  }


  return (
    <div className="flex min-h-screen justify-center items-center px-8">

      <div className="w-full max-w-xl p-11 rounded-lg shadow-lg">

        <h1 className="text-center text-[#9AB17B] font-bold text-4xl mb-8">
          Interview Setup
        </h1>


        {/* Job Role */}
        <p className="text-start text-md mb-2">
          Job Role
        </p>

        <select
          value={jobRole}
          onChange={(e)=>setJobRole(e.target.value)}
          className="border rounded-md p-3 w-full"
        >

          <option value="">
            Select Job Role
          </option>

          <option value="Frontend">
            Frontend Developer
          </option>

          <option value="Backend">
            Backend Developer
          </option>

          <option value="Fullstack">
            Full Stack Developer
          </option>

          <option value="Data">
            Data Scientist
          </option>

        </select>



        {/* Interview Type */}
        <p className="text-start text-md mt-6 mb-2">
          Interview Type
        </p>

        <select
          value={interviewType}
          onChange={(e)=>setInterviewType(e.target.value)}
          className="border rounded-md p-3 w-full"
        >

          <option value="">
            Select Interview Type
          </option>

          <option value="Technical">
            Technical
          </option>

          <option value="Behavioral">
            Behavioral
          </option>

          <option value="Mixed">
            Mixed
          </option>

        </select>



        {/* Difficulty */}
        <p className="text-start text-md mt-6 mb-2">
          Difficulty
        </p>

        <select
          value={difficulty}
          onChange={(e)=>setDifficulty(e.target.value)}
          className="border rounded-md p-3 w-full"
        >

          <option value="">
            Select Difficulty
          </option>

          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>

        </select>



        {/* Button */}
    <div className='flex justify-center'>
        <button
          onClick={handleStartInterview}
          className="
          mt-15
          bg-[#9AB17A]
          px-10
          py-3
          rounded-md
          font-semibold
          cursor-pointer
          "
        >
          Start Interview
        </button>
    </div>

      </div>
    </div>
  )
}

export default InterviewSetup