import { createContext,useState,useContext, useReducer } from "react";
import { useAuth } from "./authContext";
const ChatContext = createContext()
export const ChatContextProvider = ({children})=>{
    const [users,setUsers] = useState(false)
    const {currentUser} = useAuth()
    const INITIAL_STATE = {
        chatId:"",
        user:null
    }
    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:currentUser.uid > action.payload.uid?currentUser.uid+action.payload.uid:action.payload.uid+currentUser.uid
                }
            default:
                return state    
        }
    }
    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE)
    return(
        <ChatContext.Provider value={{users,setUsers,dispatch,data:state}}>
            {children}
        </ChatContext.Provider>
    )
}
export const useChatContext = () =>useContext(ChatContext)