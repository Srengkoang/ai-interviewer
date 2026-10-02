import React from 'react'

const Instruction = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-linear-to-r from-background to-muted/20 px-3 py-10'>
      <div className='w-full max-w-2xl rounded-lg border bg-card shadow-md mt-5 h-150'>
        <div className='flex flex-col space-y-6 p-8'>

          <div className='flex items-center justify-center h-16'>
            <h2 className='text-4xl font-bold text-[#9AB17A]'>
              Instructions
            </h2>
          </div>

          <p className='text-center text-muted-foreground'>
            Please read the following before starting your interview
          </p>
          <ul className='space-y-4 text-left'>
            <li className='flex gap-3'>
              <span className='font-bold text-primary'>1.</span>
              <p>Make sure you have a stable internet connection throughout the session.</p>
            </li>
            <li className='flex gap-3'>
              <span className='font-bold text-primary'>2.</span>
              <p>Find a quiet, well-lit place free from distractions.</p>
            </li>
            <li className='flex gap-3'>
              <span className='font-bold text-primary'>3.</span>
              <p>Read each question carefully before answering.</p>
            </li>
            <li className='flex gap-3'>
              <span className='font-bold text-primary'>4.</span>
              <p>You will have a limited time to answer each question.</p>
            </li>
            <li className='flex gap-3'>
              <span className='font-bold text-primary'>5.</span>
              <p>Answer honestly — no external help or search engines during the session.</p>
            </li>
            <li className='flex gap-3'>
              <span className='font-bold text-primary'>6.</span>
              <p>Once submitted, answers cannot be changed.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Instruction
