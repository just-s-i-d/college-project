import "./signin-up.styles.scss"
import { UserContext } from "../context/usercontext.component"
import { useContext, useEffect } from "react"
import SignUp from "./signup/signup.component"
import SignIn from "./signin/signin.component"
import Overlay from "./overlay/overlay.component"
const SignInUp = () => {
    const { signBox } = useContext(UserContext)
    const { setSignBox } = useContext(UserContext)
    const {signBoxOverlay}=useContext(UserContext)
    const {setSignBoxOverlay}=useContext(UserContext)
    const showBoxHandler = () => {
        setSignBox(!signBox)
    }
    const overlayHandler=()=>{
        setSignBoxOverlay(!signBoxOverlay)
    }
    return (
        <div id="main-container">
            <div className={`container ${signBoxOverlay===true? "right-panel-active" :""}`} id="container">
                <span id="closeLogin"  onClick={showBoxHandler}>&times;</span>
                <SignUp/>
                <SignIn/>
                <Overlay overlayHandler={overlayHandler}/>
            </div>
        </div>
    )
}
export default SignInUp