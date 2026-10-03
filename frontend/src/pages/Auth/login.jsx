import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center justify-center min-h-screen bg-red px-3"
    >
      <div className="w-full max-w-md rounded-lg border bg-card shadow-md">

        <div className="flex flex-col space-y-4 p-6 h-120">

          {/* Title */}
          <div className="flex items-center justify-center h-20 rounded-md border bg-red-300">
            <h2 className="text-5xl font-semibold">Log In</h2>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-7">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-md border bg-muted/20 px-3 py-2 mt-10"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border bg-muted/20 px-3 py-2 mt-2"
          />

          </div>

          {/* Links */}
          <div className="flex justify-center items-center text-sm mt-5">
            <p className="text-muted-foreground cursor-pointer">
              Forgot your password?
            </p>

            <span
              onClick={() => navigate('/signup')}
              className="cursor-pointer text-blue-500 space-x-2"
            >
              Sign Up here
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-[rgb(154,177,122)] py-3 font-semibold text-black cursor-pointer mt-6"
          >
            Log In
          </button>

        </div>

      </div>
    </form>
  )
}

export default Login