import { createContext,useState } from "react";
export const ResultContext=createContext({
    result:null,
    setResult:()=>null
})

export const ResultProvider=({children})=>{
    const [result,setResult]=useState()
    const value={
        result,setResult
    }
    return(
        <ResultContext.Provider value={value}>{children}</ResultContext.Provider>
    )
}