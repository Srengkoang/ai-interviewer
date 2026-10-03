import React from 'react'
import JobInterviewing from "../../assets/images1.jpg"

const Container = () => {
  return (
    <div className="absolute bg-grid-pattern opacity-5">
            <div className="container relative mx-auto px-6 py-20 md:30 lg:40">
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 items-center gap-4">
                    <div className="space-y-5">
                        <h1 className="flex-row sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
                        The Best
                        <span className= "flex-row sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#9AB17A] space-3"> Job Interview </span>
                        <br/>
                        <span className= "flex-row sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#9AB17A] space-3"> Web</span>  
                        For a better
                        <br/>
                        job Preparation
                       </h1>
                       <p className="text-sm font-semibold text-black max-w-xl">
                        This Job AI tool aim to provide as a tools to help
                        <br/>
                        Providing the Questions for the job interview to
                        <br />
                        the Candidate and the users to make them good preparation 
                        <br />
                        For there upcoming reallife job interview. 
                       </p>
                    </div>
                    
                    <div className="relative justify-self-end">
                        <img 
                        src={JobInterviewing}
                        alt="JobInterviewing" 
                        className="rounded-2xl shadow-2xl" 
                        />
                    </div>
                    
                </div>
            </div>
        </div>
  )
}

export default Container