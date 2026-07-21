import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const Navigate = useNavigate()

  const onSubmitHandler =(e) => {
  e.preventDefault()
}

  return (
    <form onSubmit={onSubmitHandler}className='flex flex-col items-center justify-center px-3 py-10 sm:mx-auto md:mx-1 lg:mx-2 mt-2 bg-gradient-to-r from-background to-muted/20'>
      <div className='rounded-lg border bg-card w-full max-w-full'>
        <div className='flex flex-col rounded-md border space-y-3 p-3 text-center'>
          <div className='flex w-full max-w-hd h-12 rounded-md border bg-muted/20 items-center justify-center mt-8 p-4'>Log In</div>
          <div className='pt-4 p-7'>
            <input type='text' placeholder='Email Address' className='w-full rounded-md border bg-muted/20 px-2 py-2' />
            <input type='password' placeholder='Password' className='w-full rounded-md border bg-muted/20 px-2 py-2 mt-2' />
            <div className ='flex justify-center text-sm mt-[-4px]'>
              <p className = 'text-muted-foreground'>Forgot your password?</p>
                 <span onClick={() => Navigate('/signup')} className = 'cursor-pointer text-blue-500'>Sign up here</span>             
            </div>
            <button className='bg-[rgb(228,223,181)] text-white rounded-sm font-semibold px-3 py-3 mt-4 '>Log In</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login