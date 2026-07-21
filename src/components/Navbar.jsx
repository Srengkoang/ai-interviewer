import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className=' flex item-center justify-between p-5 font-lg '>
        <ul className = 'flex gap-3 text-sm'>
            <NavLink to='/' className= 'flex flex-col items-center gap-2' >
                <p>home</p>
            </NavLink>
            <NavLink to='/' className= 'flex flex-col items-center gap-2' >
                <p></p>
            </NavLink>
            <NavLink to='/' className= 'flex flex-col items-center gap-2' >
                <p></p>
            </NavLink>
        </ul>

    </div>
  )
}

export default Navbar