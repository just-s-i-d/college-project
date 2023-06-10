import { Fragment } from "react"
import profilePic from "../../assets/profile.png"
// import Profile from "./profile/profile.component"
import "./profilepic.styles.scss"
// import { UserContext } from "../context/usercontext.component"
const ProfilePic = () => {
    // // const { isProfileDropDownOpen } = useContext(UserContext)
    // const { setIsProfileDropDownOpen } = useContext(UserContext)
    // // const dropDownHandler = () => setIsProfileDropDownOpen(!isProfileDropDownOpen)
    return (
        <Fragment>
            <img className="profile-pic" src={profilePic} alt="Profile Pic"  />
            {/* {isProfileDropDownOpen && <Profile />} */}
        </Fragment>
    )
}
export default ProfilePic