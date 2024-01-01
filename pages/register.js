import Link from 'next/link'
import React from 'react'
import {IoLogoGoogle,IoLogoFacebook} from 'react-icons/io'
const Register = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center bg-c1'>
      <div className='flex items-center flex-col'>
            <div className='text-center'>
                <div className='text-4xl font-bold'>
                    Create a New Account
                </div>
                <div className='mt-3 text-c3'>Connect and chat with anyone, anywhere</div>
            </div>
            <div className='flex items-center gap-2 mb-5 mt-10 w-full '>
                <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]'>
                    <div className='flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md'>
                        <IoLogoGoogle size={24}/>
                        <span>Login with Google</span>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]'>
                    <div className='flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md'>
                        <IoLogoFacebook size={24}/>
                        <span>Login with Facebook</span>
                    </div>
                </div>
            </div>
            <div className='flex gap-1 items-center'>
                <span className='w-5 h-[1px] bg-c3'></span>
                <span className='font-semibold text-c3'>OR</span>
                <span className='w-5 h-[1px] bg-c3'></span>
            </div>
            <form className='flex flex-col items-center gap-3 w-[500px] mt-5'>
                <input 
                    type="text"
                    placeholder='username'
                    className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3'    
                    autoComplete='off'
                />
                <input 
                    type="email"
                    placeholder='Email'
                    className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3'    
                    autoComplete='off'
                />
                <input 
                    type="password"
                    placeholder='Password'
                    className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3'    
                    autoComplete='off'
                />
                <button className='mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Create your account</button>
            </form>
            <div className='flex justify-center gap-1 text-c3 mt-5'>
                <span>Already a member?</span>
                <Link 
                    href='/login'
                    className='font-semibold underline-offset-2 text-white underline cursor-pointer'
                >Login here</Link>
            </div>
      </div>
    </div>
  )
}

export default Register