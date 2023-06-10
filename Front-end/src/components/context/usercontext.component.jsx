import { createContext, useState } from "react";
export const UserContext = createContext({
    signBox: false,
    setSignBox: () => null,
    signBoxOverlay: Boolean,
    setSignBoxOverlay: () => null,
    isLeftNavOpen: false,
    setIsLeftNavOpen: () => null,
    isAddClassOpen: false,
    setIsAddClassOpen: () => null,
    isSearchClassOpen: false,
    setIsSearchClassOpen: () => null,
    isAddQuizOpen: false,
    setIsAddQuizOpen: () => null,
    isProfileDropDownOpen: false,
    setIsProfileDropDownOpen: () => null,
    perQuestion: null,
    setPerQuestion: () => null,
    isDeleteDropDownOpen:null,
    setIsDeleteDropDownOpen:()=>null
})
export const UserProvider = ({ children }) => {
    const [signBox, setSignBox] = useState(false)
    const [signBoxOverlay, setSignBoxOverlay] = useState(true)
    const [isLeftNavOpen, setIsLeftNavOpen] = useState(false)
    const [isAddClassOpen, setIsAddClassOpen] = useState(false)
    const [isSearchClassOpen, setIsSearchClassOpen] = useState(false)
    const [isAddQuizOpen, setIsAddQuizOpen] = useState(false)
    const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false)
    const [perQuestion, setPerQuestion] = useState()
    const [isDeleteDropDownOpen,setIsDeleteDropDownOpen]=useState(false)
    const value = {
        signBox, setSignBox,
        signBoxOverlay, setSignBoxOverlay,
        isLeftNavOpen, setIsLeftNavOpen,
        isAddClassOpen, setIsAddClassOpen,
        isSearchClassOpen, setIsSearchClassOpen,
        isAddQuizOpen, setIsAddQuizOpen,
        isProfileDropDownOpen, setIsProfileDropDownOpen,
        perQuestion, setPerQuestion,
        isDeleteDropDownOpen,setIsDeleteDropDownOpen
    }
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}