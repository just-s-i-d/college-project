import "./home.styles.scss"
import NavBar from "../../navbar/navbar.component"
import { Fragment,useContext } from "react"
import Intro from "../../intro/intro.component"
import SignInUp from "../../signin-up/signin-up.component"
import { UserContext } from "../../context/usercontext.component"
import SVGComponent from "./howtouse"
import Footer from "../../footer/footer.component"


const Home = () => {
    const {signBox}=useContext(UserContext)
    return (
        <div className="home-container">
            <NavBar />
            <Intro />
            {signBox &&<SignInUp/>}
            <span className="how-to-use"><SVGComponent/></span>
            <Footer />
        </div>
    )
}
export default Home