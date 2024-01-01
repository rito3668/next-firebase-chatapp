import { createContext,useContext, useEffect, useState } from "react"
import { onAuthStateChanged,signOut as authSignOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
const UserContext = createContext()


export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const clear = ()=>{
        setCurrentUser(null)
        setIsLoading(false)
    }
    const authStateChanged = async(user)=>{
        setIsLoading(true)
        if(!user){
            clear()
            return
        }
        const docData = await getDoc(doc(db,"users",user.uid))
        setCurrentUser(docData.data())
        setIsLoading(false)
    }
    const signOut = ()=>{
        authSignOut(auth).then(()=>clear())
    }
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,authStateChanged)
        return ()=>unsub()
    },[])

    return(
        <UserContext.Provider value={{setCurrentUser,setIsLoading,currentUser,isLoading,signOut}}>
            {children}
        </UserContext.Provider>
    )
}
export const useAuth = ()=>useContext(UserContext)