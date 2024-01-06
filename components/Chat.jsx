import React from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import ChatFooter from './ChatFooter'
import { useChatContext } from '@/context/chatContext'
const Chat = () => {
    const {data} = useChatContext()
  return (
    <div className='flex flex-col p-5 grow'>
      <ChatHeader/>
      {data.chatId && <Messages/>}
      <ChatFooter/>
    </div>
  )
}

export default Chat
