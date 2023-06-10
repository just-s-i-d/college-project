import {Link, useParams} from "react-router-dom"
import "./leftnavbar.styles.scss"
import { signOutUser } from "../utils/firebase/firebase.utils"
const LeftNavBar=({links,accType})=>{
    const {uid}=useParams()
    const logOutHandler=()=>{
        signOutUser()
    }
    return(
        <div className="left-navbar-container">
           {links&&links.map(d=><Link to={`http://localhost:3000/${accType}/${uid}/${d}`}><span className="links">{d}</span></Link>)}
           <div className="log-out" onClick={logOutHandler}>Log Out</div>
        </div>
    )
}
export default LeftNavBar