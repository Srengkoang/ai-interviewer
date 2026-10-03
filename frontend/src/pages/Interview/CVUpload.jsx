import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CVUpload = () => {

  const [file, setFile] = useState(null)

  const navigate = useNavigate()


  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }


  const handleUpload = () => {

    if (!file) {
      alert("Please upload your CV first")
      return
    }

    console.log("Uploading:", file.name)

    // After upload go to interview setup
    navigate("/interview-setup")
  }



  return (
    <div className="flex min-h-screen justify-center items-center px-4">


      <div className="
        w-full 
        max-w-xl
        min-h-[600px]
        p-10
        rounded-lg
        shadow-lg
        text-center
      ">


        <h2 className="
          text-4xl
          font-bold
          text-[#9AB17A]
          mb-6
        ">
          CV Upload
        </h2>



        <p className="text-md text-black mb-5">
          Please upload your CV here
        </p>



        {/* Upload Box */}
        <label
          htmlFor="cv-upload"
          className="
            flex
            flex-col
            items-center
            justify-center
            h-70
            w-full
            border-2
            border-dashed
            rounded-md
            cursor-pointer
            hover:border-[#9AB17A]
          "
        >


          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-[#9AB17A] mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="
              M7 16a4 4 0 01-.88-7.903
              A5 5 0 1115.9 6
              L16 6a5 5 0 011 9.9
              M15 13l-3-3m0 0l-3 3
              m3-3v12
              "
            />

          </svg>


          <p className="text-sm text-gray-500">
            Click to upload or drag and drop
          </p>

          <p className="text-xs text-gray-400 mt-1">
            DOC, DOCX, or PDF
          </p>


          <input
            id="cv-upload"
            type="file"
            accept=".doc,.docx,.pdf"
            onChange={handleChange}
            className="hidden"
          />

        </label>




        {/* Selected File */}
        {file && (

          <div className="
            mt-5
            flex
            justify-center
            items-center
            gap-3
          ">


            <div className="
              w-12
              h-12
              bg-[#9AB17A]
              rounded-md
              flex
              items-center
              justify-center
              text-white
              font-bold
            ">
              {file.name.split(".").pop().toUpperCase()}
            </div>


            <p className="text-sm">
              {file.name}
            </p>


          </div>

        )}




        {/* Button */}
        <div className="flex justify-center">

          <button
            type="button"
            onClick={handleUpload}
            className="
              mt-13
              px-10
              bg-[#9AB17A]
              py-3
              font-semibold
              rounded-md
              cursor-pointer
            "
          >
            Upload
          </button>

        </div>


      </div>


    </div>
  )
}


export default CVUpload