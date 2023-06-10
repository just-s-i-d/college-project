import "./profile.styles.scss"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { useNavigate } from "react-router-dom"
const Profile=()=>{
    const navigate=useNavigate()
    const signOutHandler=()=>{
        signOutUser()
        navigate("/")
    }
    return(
        <div className="profile-dropdown-container">
            <span>Edit Profile</span>
            <span onClick={signOutHandler}>Sign Out</span>
        </div>
    )
}
export default Profile