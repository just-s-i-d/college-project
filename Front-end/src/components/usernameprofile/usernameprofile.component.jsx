import "./usernameprofile.styles.scss"
import ProfilePic from "../profilepic/profilepic.component"
import { useContext } from "react"
import { CurrentUserContext } from "../context/currentusercontext.component"

const UserNameProfile = ({displayName}) => {
    // const {currentUser} =useContext(CurrentUserContext)
    return (
        <div className="navbar-right-container" >
            <span className="name">{displayName}</span>
            <ProfilePic />
        </div >
    )
}
export default UserNameProfile