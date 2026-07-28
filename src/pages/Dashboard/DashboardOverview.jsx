import React from 'react'

const DashboardOverview = () => {
  return (
    <div className='container mx-auto px-4'>
      
      <div className='text-start mt-6'>
        <h1 className='font-bold text-3xl lg:text-4xl mt-8 text-[#9AB17A]'>
          Overview
        </h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto max-w-7xl'>

        <div className='border bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px] mt-8'>
          <div className='p-8 h-full flex flex-col justify-center'>
            <h4 className='text-xl font-bold text-[#9AB17A] mb-3'>
              Total Users
            </h4>
            <p className='text-8xl mt-6 text-red-400'>
              20
            </p>
          </div>
        </div>


        <div className='border bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px] mt-8'>
          <div className='p-8 h-full flex flex-col justify-center'>
            <h4 className='text-xl font-bold text-[#9AB17A] mb-3'>
              Total Interviews
            </h4>
            <p className='text-8xl mt-6 text-red-400'>
              7
            </p>
          </div>
        </div>


        <div className='border bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px] mt-8'>
          <div className='p-8 h-full flex flex-col justify-center'>
            <h4 className='text-xl font-bold text-[#9AB17A] mb-3'>
              Completed
            </h4>
            <p className='text-8xl mt-6 text-red-400'>
              5
            </p>
          </div>
        </div>


        <div className='border bg-card rounded-lg text-card-foreground shadow-lg transition-all hover:border-blue-500 min-h-[280px] mt-8'>
          <div className='p-8 h-full flex flex-col justify-center'>
            <h4 className='text-xl font-bold text-[#9AB17A] mb-3'>
              Average Score
            </h4>
            <p className='text-8xl mt-6 text-red-400'>
              75
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default DashboardOverview