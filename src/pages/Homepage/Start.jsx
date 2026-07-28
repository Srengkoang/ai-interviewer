import React from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {
  const navigate = useNavigate()

  return (
    <div className='py-24'>
      <div className='container mx-auto p-5'>
        <div className='rounded-lg bg-card max-w-3xl mx-auto border-0 shadow-2xl bg-[rgb(154,177,122)]'>
          <div className='text-center p-14 space-y-8'>
            <h2 className='sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white'>
              Ready to Ace Your Next Interview?
            </h2>
            <p className='font-semibold mx-auto text-lg text-primary-foreground/90 max-w-xl text-white'>
              Start practicing today with AI-powered mock interviews, completely free.
            </p>
            <div className='flex flex-col sm:flex-row gap-5 justify-center'>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center gap-2 px-6 rounded-md bg-white py-3 font-semibold cursor-pointer text-[#C3CC9B]"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="inline-flex items-center justify-center gap-2 px-6 rounded-md bg-white py-3 font-semibold cursor-pointer text-[#C3CC9B]"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start