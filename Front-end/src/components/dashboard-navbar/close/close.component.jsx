import { Fragment } from "react"
const Close=({onClick})=>{
    return(<span className="open-close" onClick={onClick}>&#10005;</span>)
}
export default Close