import React from 'react'
import { PopupWrapper } from './PopupWrapper'
import { useAuth } from '@/context/authContext'
import { useChatContext } from '@/context/chatContext'
import { RiErrorWarningLine } from 'react-icons/ri'
import { DELETED_FOR_EVERYONE,DELETED_FOR_ME } from '@/utils/constant'
const DeleteMsgPopup = (props) => {
  const {currentUser} = useAuth()
  const {users,dispatch} = useChatContext()
  
  return (
    <PopupWrapper {...props}>
      <div className='mt-10 mb-5'>
        <div className='flex items-center justify-center gap-3'>
            <RiErrorWarningLine size={24} className='text-red-500'/>
            <div className='text-lg'>Are You sure you want to delete the message?</div>
        </div>
        <div className='flex items-center justify-center gap-2 mt-10'>
          
             <button onClick={()=>props.deleteMessage(DELETED_FOR_ME)} className='border-[2px] border-red-700 px-4 py-2 rounded-md text-sm text-red-500 hover:bg-red-700 hover:text-white'>Delete for me?</button>
           
           {props.self && 
            <button onClick={()=>props.deleteMessage(DELETED_FOR_EVERYONE)} className='border-[2px] border-red-700 px-4 py-2 rounded-md text-sm text-red-500 hover:bg-red-700 hover:text-white'>Delete for Everyone?</button>}
            <button className='border-[2px] border-white px-4 py-2 rounded-md text-sm text-white hover:bg-white hover:text-black' onClick={props.onHide}>Cancel</button>
        </div>
      </div>
    </PopupWrapper>

  )
}

export default DeleteMsgPopup
