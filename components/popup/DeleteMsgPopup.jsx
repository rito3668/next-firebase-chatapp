import React from 'react'
import { PopupWrapper } from './PopupWrapper'
import { useAuth } from '@/context/authContext'
import { useChatContext } from '@/context/chatContext'
const DeleteMsgPopup = (props) => {
  const {currentUser} = useAuth()
  const {users,dispatch} = useChatContext()
  
  return (
    <PopupWrapper {...props}>
      <div className='mt-10 mb-5'>
        <div></div>
      </div>
    </PopupWrapper>

  )
}

export default DeleteMsgPopup
