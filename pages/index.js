import { useAuth } from '@/context/authContext'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import LeftNav from '@/components/LeftNav'
import Chats from '@/components/Chats'
import Chat from '@/components/Chat'
import { useChatContext } from '@/context/chatContext'
const Home = () => {
  const {signOut,currentUser,isLoading} = useAuth()
  const router = useRouter()
  const {data} = useChatContext()
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
        <LeftNav/>
        <div className="flex bg-c2 grow">
          <div className='w-[400px] p-5 overflow-auto scrollbar shrink-0 border-r border-white/[0.05]'>
            <div className='flex flex-col h-full'>
              <Chats/>
            </div>
          </div>
          {data.user && <Chat/>}
        </div>
      </div>
    </div>
  )
}

export default Home
 