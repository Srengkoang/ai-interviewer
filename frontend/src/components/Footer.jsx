import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex w-full mx-auto py-8 border rounded-t-full bg-[rgb(195,204,155)]'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5'>
          <div className='space-y-4 justify-center items-center pl-25'>
            <ul className="flex flex-row gap-6 text-sm text-gray-700 px-6 justify-center ">
              <li className='flex flex-col items-center max-w-xs ml-40'>
                <img
                  src="/favicon.svg"
                  className="w-50"
                  alt="AI Interviewer Logo"
                />
                <p className='font-semibold text-sm mt-4 text-start justify-center'>
                  An AI-powered tool to help you prepare for your job interview and land your dream job.
                </p>
                <p className='text-start text-xs mt-6 text-muted-foreground whitespace-nowrap'>
                  @ 2026 AI Interview.All rights reserved.
                </p>
              </li>
              <li className='container pl-60'>
                <NavLink to='/' className='flex flex-col justify-center items-center pb-3'>
                  Home
                </NavLink>
                <NavLink to='/instruction' className='flex flex-col justify-center items-center pb-3'>
                  Instruction
                </NavLink>
                <NavLink to='/login' className='flex flex-col justify-center items-center pt-2'>
                  Login
                </NavLink>
              </li>
            </ul>
          </div>

          <div className='space-y-4 justify-center items-center text-muted-foreground pl-100'>
            <ul className="flex flex-row gap-8 text-sm text-gray-700 px-6 justify-center">
              <li>
                <NavLink to='/About' className='flex flex-col justify-center items-center pb-3 '>
                  About Us
                </NavLink>
                <NavLink to='/Contact' className='flex flex-col justify-center items-center pt-2'>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer