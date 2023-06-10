import { useContext } from "react"
import { useLocation } from "react-router-dom"
import UserNameProfile from "../usernameprofile/usernameprofile.component"
import "./dash-navbar.styles.scss"
import Plus from "./plus/plus.component"
import { UserContext } from "../context/usercontext.component"
import Close from "./close/close.component"
import Open from "./open/openbutton.component"
import DeleteMenu from "../deletemenu/deletemenu.component"
const DashNavBar = (props) => {
    const { onClick, displayName,accType} = props
    const location = useLocation()
    const { isLeftNavOpen } = useContext(UserContext)
    const { setIsLeftNavOpen } = useContext(UserContext)
    const conditionForShowingPlus = location.pathname.includes("student") && location.pathname.includes("class")
   
    const leftMenuOpenHandler = () => {
        setIsLeftNavOpen(!isLeftNavOpen)
    }

    return (
        <div className="dashboard-nav-container">
            <span className="items">{isLeftNavOpen ? <Close onClick={leftMenuOpenHandler} /> : <Open onClick={leftMenuOpenHandler} />} Testlo!</span>
            <span className="items">{location.pathname.includes("teacher") ? "Teacher" : "Student"} Dashboard</span>
            <span className="right-items-container">
                {conditionForShowingPlus ? "" : <Plus onClick={onClick} />}
                <UserNameProfile displayName={displayName}/>
            </span>
        </div>
    )
}
export default DashNavBar
