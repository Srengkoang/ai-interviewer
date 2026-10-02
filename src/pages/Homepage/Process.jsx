import React from 'react'

const Process = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='text-center mb-10'>
        <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl mb-11'>
          How the AI Interview Work
        </h1>
        <p className='mx-auto text-lg max-w-2xl text-muted-foreground'>
          Below are the simple steps to use this website
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mx-auto max-w-5xl'>
        <div className='border-2 bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px]'>
          <div className='p-8 space-y-4 h-full flex flex-col justify-center'>
            <div className='space-y-2'>
              <div className='text-2xl font-semibold text-primary mt-2'>
                Step 1
              </div>
              <h4 className='text-xl font-bold mt-3 text-[#9AB17A]'>
                Upload your CV
              </h4>
              <p className='text-base mt-3'>
                Upload any kinds of your job applications into our website.
              </p>
            </div>
          </div>
        </div>
        <div className='border-2 bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px]'>
            <div className='p-8 space-y-4 h-full flex flex-col justify-center'>
                <div className='space-y-2'>
                    <div className='text-2xl font-semibold text-primary mt-2 '>
                     Step 2   
                    </div>
                    <h4 className='text-xl font-bold mt-3 text-[#9AB17A]'>
                    AI Question Generation
                    </h4>
                    <p className='text-base mt-3'>
                        Our AI generates personalized interview questions based on your CV and target job role.
                    </p>                    
                </div>
            </div>
        </div>
        <div className='border-2 bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px]'>
            <div className='p-8 space-y-4 h-full flex flex-col justify-center'>
                <div className='space-y-2'>
                    <div className='text-2xl font-semibold text-primary mt-2'>
                     Step 3   
                    </div>
                    <h4 className='text-xl font-bold mt-3 text-[#9AB17A]'>
                     Start the Interview
                    </h4>
                    <p className='text-base mt-3'>
                         Answer AI-generated questions in a realistic mock interview setting, just like the real thing.
                    </p>                    
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Process