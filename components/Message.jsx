import { useAuth } from '@/context/authContext'
import React, { useState } from 'react'
import Avatar from './Avatar'
import {GoChevronDown} from 'react-icons/go'
import { useChatContext } from '@/context/chatContext'
import Image from 'next/image'
import ReactSimpleImageViewer from 'react-simple-image-viewer'
import { formatDate } from '@/utils/helpers'
import ImageViewer from 'react-simple-image-viewer'
import { Timestamp } from 'firebase/firestore'
import { wrapEmojisInHtmlTag } from '@/utils/helpers'
import Icon from './Icon'
const Message = ({message}) => {
    const {currentUser} = useAuth()
    const [showMenu,setShowMenu] = useState(false)
    const self = message.sender === currentUser.uid
    const {users,data,imageViewer,setImageViewer} = useChatContext()
    const timestamp = new Timestamp(
        message?.date?.seconds,
        message?.date?.nanoseconds
    )
    const date = timestamp.toDate()
  return (
    <div className={`mb-5 max-w-[75%] ${self?"self-end":""}`}>
      <div className={`flex items-end gap-3 mb-1 ${self?"justify-start flex-row-reverse":""}`}>
        <Avatar
            size='small'
            user={self?currentUser:users[data.user.uid]}
            className='mb-4'
        />
        <div className={`group flex flex-col gap-4 p-4 rounded-3xl relative break-all ${self?"rounded-br-md bg-c5":"rounded-bl-md bg-c1"}`}>
            {message.text && (
                <div className='text-sm' dangerouslySetInnerHTML={{__html:wrapEmojisInHtmlTag(message.text)}}>
                    
                </div>
            )}
            {message.img&&(
                <>
                    <Image 
                        src={message.img}
                        width={250}
                        height={250}
                        alt={message?.text||""}
                        className='rounded-3xl max-w-[250px]'
                        onClick={()=>{
                            setImageViewer({
                                msgId:message.id,
                                url:message.img
                            })
                        }} 
                    />
                    {
                        imageViewer && imageViewer.msgId === message.id &&(
                            <ImageViewer
                                src={[imageViewer.url]}
                                currentIndex={0}
                                disableScroll={false}
                                closeOnClickOutside = {true}
                                onClose={()=>setImageViewer(null)}
                            />
                        )
                    }
                </>
            )}
            <div className={`${showMenu?"":"hidden"} group-hover:flex absolute top-2 ${self?"left-2 bg-c5":"right-2 bg-c1"}`}>
                <Icon
                    size="medium"
                    className="hover:bg-inherit rounded-none"
                    icon={<GoChevronDown size={24} className='text-c3'/>}
                />
            </div>
        </div>
        </div>
      <div className={`flex items-end ${self?"justify-start flex-row-reverse mr-12":"ml-12"}`}>
        <div className='text-xs text-c3'>{formatDate(date)}</div>
      </div>
    </div>
  )
}

export default Message
