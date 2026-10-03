import React from 'react'

const Benefit = () => {
  return (
    <div className='container inline mx-auto px-4'>
      <div className='text-center mb-10'>
        <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl mb-11'>
          Why Choose Our AI Interviewer
        </h1>
        <p className='mx-auto text-lg max-w-2xl text-muted-foreground'>
          Built to make interview practice fair, fast, and accessible for everyone
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mx-auto max-w-5xl'>
        <div className='border-2 bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px]'>
          <div className='p-8 space-y-4 h-full flex flex-col justify-center'>
            <div className='space-y-2'>
              <h4 className='text-xl font-bold mt-3 text-[#9AB17A] mb-3'>
                Fairness & Consistency
              </h4>
              <p className='text-base mt-6'>
                Every candidate is evaluated using the same AI-driven criteria, removing bias between different human interviewers.
              </p>
            </div>
          </div>
        </div>

        <div className='border-2 bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px]'>
          <div className='p-8 space-y-4 h-full flex flex-col justify-center'>
            <div className='space-y-2'>
              <h4 className='text-xl font-bold mt-3 text-[#9AB17A] mb-3'>
                Saves Time
              </h4>
              <p className='text-base mt-6'>
                Automates the interview process, cutting down waiting time for both candidates and recruiters.
              </p>
            </div>
          </div>
        </div>

        <div className='border-2 bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px]'>
          <div className='p-8 space-y-4 h-full flex flex-col justify-center'>
            <div className='space-y-2'>
              <h4 className='text-xl font-bold mt-3 text-[#9AB17A] mb-3'>
                Instant Feedback & History
              </h4>
              <p className='text-base mt-6'>
                Receive feedback right after your session, with performance records saved for future reference.
              </p>
            </div>
          </div>
        </div>

        <div className='border-2 bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px]'>
          <div className='p-8 space-y-4 h-full flex flex-col justify-center'>
            <div className='space-y-2'>
              <h4 className='text-xl font-bold mt-3 text-[#9AB17A] mb-3'>
                Practice Anytime, Anywhere
              </h4>
              <p className='text-base mt-6'>
                Access mock interviews 24/7 from any device, allowing candidates to prepare whenever and wherever it is most convenient.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Benefit