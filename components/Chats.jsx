import React, { useEffect } from 'react'
import { useChatContext } from '@/context/chatContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
const Chats = () => {
    const {users,setUsers} = useChatContext()
    useEffect(()=>{
        const unsub = onSnapshot(collection(db,"users"),
        (snapshot)=>{
            const updateUsers = {}
            snapshot.forEach((doc)=>{
                
                updateUsers[doc.id] = doc.data()
                console.log(doc.data())
            })
            setUsers(updateUsers)
            console.log(updateUsers)
        })
    },[])
  return (
    <div>
      Chats
    </div>
  )
}

export default Chats
