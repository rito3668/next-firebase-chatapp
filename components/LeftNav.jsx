import React, { useState } from 'react'
import {BiCheck, BiEdit}from 'react-icons/bi'
import Avatar from './Avatar'
import Icon from './Icon'
import {FiPlus} from 'react-icons/fi'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer ,toast} from 'react-toastify';
import {MdPhotoCamera,MdAddAPhoto, MdDeleteForever} from 'react-icons/md'
import {IoClose, IoLogOutOutline} from 'react-icons/io5'
import {BsCheckCircleFill} from 'react-icons/bs'
import ToastMessage from './ToastMessage'
import { profileColors } from '@/utils/constant'
import { useAuth } from '@/context/authContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db,auth, storage } from '@/firebase/firebase'
import { updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import UsersPopup from './popup/UsersPopup'
import  PopupWrapper  from './popup/PopupWrapper'
const LeftNav = () => {
    const {currentUser,signOut,setCurrentUser} = useAuth()
    const [usersPopup,setUsersPopup] = useState(false)
    const [editProfile,setEditProfile] = useState(false)
    const authUser = auth.currentUser
    const [nameEdited,setNameEdited] = useState(false)
    const uploadProfilePhoto = (file)=>{
        try{
            if(file){
                const storageRef = ref(storage, currentUser.displayName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    console.log(error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    console.log('File available at', downloadURL);
                        handleProfileUpdate("photo",downloadURL )
                        await updateProfile(authUser,{
                            photoURL:downloadURL
                        })
                    });
                }
                );
          }
        }catch(err){
            console.log(err)
        }
    }
    const handleProfileUpdate = async(type,value)=>{
        //color,name,photo,photo-remove
        let obj = { ...currentUser}
        switch(type){
            case 'color':
                obj.color = value
                break
            case "name":
                obj.displayName = value
                break
            case "photo":
                obj.photoURL = value
                break;
            case "photo-remove":
                obj.photoURL = null
                break
            default:    
                break                
        }
        try {
            toast.promise(async()=>{
               const userDocRef = doc(db,"users",currentUser.uid)
               await updateDoc(userDocRef,obj)
               setCurrentUser(obj)
               if(type === "photo-remove"){
                await updateProfile(authUser,{
                    photoURL:null
                })
               }
               if(type === "name"){
                await updateProfile(authUser,{
                    displayName:value
                })
                setNameEdited(false)
               }
            },{
                pending: 'Updating profile',
                success: 'Profile updated success',
                error: 'Profile update failed'
            },{
                autoClose:2000
            })
        } catch (error) {
            console.log(error)
        }
    }
    const onKeyDown = (event)=>{
        if(event.key==='Enter' && event.keyCode === 13){
            event.preventDefault()
        }
    }
    const onKeyUp = (event)=>{
        if(currentUser.displayName !== event.target.innerText.trim()){
            //name edit hogaya
            setNameEdited(true)
        }else{
            // edit nehi hua
            setNameEdited(false)
        }
    }
    const editProfileContainer = ()=>{
        return (
            <div className='relative flex flex-col items-center'>
                <ToastMessage/>
                <Icon
                    size="small"
                    className="absolute top-0 right-5 hover:bg-c2"
                    icon={<IoClose size={20}/>}
                    onClick={()=>setEditProfile(false)}
                />

                <div className='relative group cursor-pointer'>
                    <Avatar
                        size="xx-large"
                        user={currentUser}
                    />
                    <div className='w-full h-full rounded-full bg-black/[0.5] absolute top-0 left-0 justify-center items-center hidden group-hover:flex '>
                        <label htmlFor="file" className='cursor-pointer'>
                        {currentUser.photoURL?(
                            <MdPhotoCamera size={34}/>
                            
                        ):(
                            <MdAddAPhoto  size={34}/>
                        )}
                        </label>
                        <input 
                            id='file'
                            type='file'
                            onChange={e=>{uploadProfilePhoto(e.target.files[0])}}
                            style={{display:'none'}}
                        />    
                    </div>
                    {
                        currentUser.photoURL && (<div className='w-6 h-6 rounded-full bg-red-500 flex justify-center items-center absolute right-0 bottom-0'>
                        <MdDeleteForever size={14} onClick={()=>handleProfileUpdate("photo-remove")}/>
                    </div>)
                    }
                </div>
                <div className='mt-5 flex flex-col items-center'>
                    <div className='flex items-center gap-2'>
                        {!nameEdited && <BiEdit className='text-c3'/>}
                        {nameEdited && <BsCheckCircleFill className='text-c4 cursor-pointer'
                            onClick={()=>{
                                //change the displayName
                                handleProfileUpdate("name",document.getElementById("displayNameEdit").innerText)
                            }}
                        />}
                        <div 
                            contentEditable 
                            className='bg-transparent outline-none
                             border-none text-center'
                            id='displayNameEdit'
                            onKeyUp={onKeyUp}
                            onKeyDown={onKeyDown}
                        >
                            {currentUser.displayName}
                        </div>
                    </div>
                    <span className='text-c3 text-sm'>{currentUser.email}</span>
                </div>
                <div className='grid grid-cols-5 gap-4 mt-5'>
                    {profileColors.map((color,index)=>(
                        <span key={index} className='w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125' style={{backgroundColor:color}} onClick={()=>{
                            //change the displayName
                            handleProfileUpdate("color",color)
                        }}>
                            {color === currentUser.color && <BiCheck size={24}/>}
                        </span>
                    ))}
                </div>
            </div>
        )
    }
  return (
    <div className={`${editProfile?"w-[350px]":"w-[80px] items-center"}  flex flex-col justify-between py-5 shrink-0 transition-all`}>
        {
            editProfile?
                editProfileContainer()
            :(
                <div className='relative group cursor-pointer' onClick={()=>setEditProfile(true)}>
        <Avatar size="large" user={currentUser}/>
        <div className='w-full h-full rounded-full bg-black/[0.5] absolute top-0 left-0 justify-center items-center hidden group-hover:flex'>
            <BiEdit size={14}/>
        </div>
      </div>
            )
        }
      
      <div className={`${editProfile?"ml-5":"flex-col items-center"} flex gap-5 `}>
        <Icon
            size="x-large"
            className="bg-green-500 hover:bg-green-600"
            icon={<FiPlus size={24}/>}
            onClick={()=>setUsersPopup(!usersPopup)}
        />
        <Icon
            size="x-large"
            className="hover:bg-c2"
            icon={<IoLogOutOutline size={24}/>}
            onClick={signOut}
        />
      </div>
         {usersPopup && <UsersPopup title="Find a user" onHide={()=>setUsersPopup(false)}/>}
    </div>
  )
}

export default LeftNav
