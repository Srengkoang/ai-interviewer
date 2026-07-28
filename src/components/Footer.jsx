import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex w-full mx-auto py-8 border rounded-t-full bg-[rgb(195,204,155)]'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5'>
          <div className='space-y-4 jusify-center items-center'>
            <ul className="flex flex-row gap-6 text-sm text-gray-700 px-6 justify-center">
              <li>
                <img 
                  src="/logo.png"
                  className="w-50"
                  alt="AI Interviewer Logo"
                />
              </li>
              <li>
                <NavLink
                  to='/'
                  className='flex flex-col justify-center items-center pb-3'
                >
                  Home
                </NavLink>
                <NavLink
                  to='/Instruction'
                  className='flex flex-col justify-center items-center pb-3'
                >
                  Instruction
                </NavLink>
                <NavLink
                  to='/Login'
                  className='flex flex-col justify-center items-center pt-2'
                >
                  Login
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