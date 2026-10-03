import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate()

  const onSubmitHandler = (e) => {
    e.preventDefault()

    // Later:
    // Send signup data to backend
    // Create account
    // Send verification code

    navigate("/verify")
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-background to-muted/20 px-3"
    >
      <div className="w-full max-w-md rounded-lg border bg-card shadow-md">

        <div className="flex flex-col space-y-4 p-6 h-150">

          {/* Title */}
          <div className="flex items-center justify-center h-20 rounded-md border bg-red-300">
            <h2 className="text-5xl font-semibold">
              Sign Up
            </h2>
          </div>


          {/* Input Fields */}
          <div className="flex flex-col gap-7">

            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-md border bg-muted/20 px-3 py-2 mt-7"
            />


            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-md border bg-muted/20 px-3 py-2 mt-3"
            />


            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border bg-muted/20 px-3 py-2 mt-3"
            />


            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-md border bg-muted/20 px-3 py-2 mt-3"
            />

          </div>


          {/* Login Link */}
          <div className="flex justify-center items-center text-sm mt-5 space-x-2">

            <p className="text-muted-foreground">
              Already have account?
            </p>


            <Link
              to="/login"
              className="cursor-pointer text-blue-500"
            >
              Log In here
            </Link>

          </div>


          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-[rgb(154,177,122)] py-3 font-semibold text-black cursor-pointer mt-6"
          >
            Sign Up
          </button>


        </div>

      </div>
    </form>
  )
}

export default Signup