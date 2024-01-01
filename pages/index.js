import { useAuth } from '@/context/authContext'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
const Home = () => {
  const {signOut,currentUser,isLoading} = useAuth()
  const router = useRouter()
  
  useEffect(()=>{
     if(!isLoading && !currentUser){
      router.push("/login")
     }
  },[currentUser,isLoading])
  return !currentUser?<Loader/>:(
    // <div>
    //     <button className='text-black bg-slate-400' onClick={signOut}>Signout</button>
    // </div>
    <div className='bg-c1 flex h-[100vh]'>
      <div className="flex w-full shrink-0">
        <div>Left Nav</div>
        <div className="flex bg-c2 grow">
          <div>Sidebar</div>
          <div>Chat</div>
        </div>
      </div>
    </div>
  )
}

export default Home
 