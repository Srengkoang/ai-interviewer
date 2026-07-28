import React from 'react'
import { NavLink } from 'react-router-dom'
import Instruction from '../pages/Homepage/Instruction'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-7 px-6 font-semibold bg-[rgb(195,204,155)]">

      <img 
        src="/logo.png"
        className="w-40"
        alt="AI Interviewer Logo"
      />

      <ul className="flex flex-row gap-6 text-sm text-gray-700">

        <NavLink 
          to="/"
          className="flex flex-row items-center gap-2"
        >
          <p>Home</p>
        </NavLink>

        <NavLink 
          to="/Dashboard"
          className="flex flex-row items-center gap-2"
        >
          <p>Dashboard</p>
        </NavLink>

        <NavLink 
          to="/cv-upload"
          className="flex flex-row items-center"
        >
          <p>Interview</p>
        </NavLink>

        <NavLink 
          to="/Instruction"
          className="flex flex-row items-center"
        >
          <p>Instruction</p>
        </NavLink>


        <NavLink 
          to="/login"
          className="flex flex-row items-center"
        >
          <p>Login</p>
        </NavLink>

      </ul>

    </div>
  )
}

export default Navbar
