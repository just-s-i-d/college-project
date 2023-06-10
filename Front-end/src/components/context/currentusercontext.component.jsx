import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


export const CurrentUserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    quizTime:Number,
    setQuizTime:()=>null
})

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [quizTime, setQuizTime] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                setCurrentUser(user)
                sessionStorage.setItem('currentUser', JSON.stringify(user))
            }else{
                setCurrentUser(null)
                sessionStorage.removeItem("currentUser")
            }
        })
        return unsubscribe
    }, [currentUser])
  

    const value = { currentUser, setCurrentUser,setQuizTime,quizTime }
    return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}

