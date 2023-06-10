import { Fragment,useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import logo from "../../assets/testlo.png"
import "./navbar.styles.scss"
import { UserContext } from "../context/usercontext.component"

const NavBar = () => {
    const {setSignBox}=useContext(UserContext)
    const {signBox}=useContext(UserContext)
    const showBoxHandler = () => {
        setSignBox(!signBox)
    }
    return (
        <Fragment>
            <nav id="navBar">
                <div className="main-menu-container">
                    <div className="left-menu">
                        <Link to="/"><span className="links">Home</span></Link>
                        <Link to="aboutus"><span className="links">About Us</span></Link>
                        {/* <Link><span className="links">Contact Us</span></Link> */}
                    </div>
                    <div className="logo">
                        <Link><img src={logo} alt="testlo" /></Link>
                    </div>
                    <div className="right-menu" >
                        <Link onClick={showBoxHandler}><span className="links">Sign in/up</span></Link></div>
                </div>
            </nav>
            <Outlet />
        </Fragment>
    )

}
export default NavBar