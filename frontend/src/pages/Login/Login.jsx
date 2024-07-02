import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding 
        backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Login
                <span className='text-blue-500'>ChatApp</span>
            </h1>

            <form>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-black'>
                            Username
                        </span>
                    </label>
                    <input type='text' placeholder='johndoe' className='w-full input input-bordered h-10'/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-black'>
                            Password
                        </span>
                    </label>
                    <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10'/>
                </div>
                <Link to='/signup' className='text-sm text-black hover:underline hover:text-blue-600 mt-2 inline-block'>
                    {"Don't"} have an account?
                </Link>
                <button className='btn btn-block btn-sm mt-2 border-slate-700'>
                    Login
                </button>
            </form>

        </div>
    </div>
  )
}