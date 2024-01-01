import { useAuth } from '@/context/authContext'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
const Home = () => {
  const {signOut,currentUser,isLoading} = useAuth()
  const router = useRouter()
  useEffect(()=>{
     if(!isLoading && !currentUser){
      router.push("/login")
     }
  },[currentUser,isLoading])
  return (
    <div>
        <button className='text-black bg-slate-400' onClick={signOut}>Signout</button>
    </div>
  )
}

export default Home
 