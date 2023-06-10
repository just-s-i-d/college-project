import { Fragment } from "react"

const Open=({onClick})=>{
    return(
        <span className="open-close" onClick={onClick}>&#9776;</span>
    )
}
export default Open