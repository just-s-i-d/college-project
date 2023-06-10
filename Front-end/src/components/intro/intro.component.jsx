import Button from "../button/button.component"
import arrow from "../../assets/down-arrow.png"
import "./intro.styles.scss"
import { UserContext } from "../context/usercontext.component"
import { useContext } from "react"

const Intro = () => {
    const { signBox} = useContext(UserContext)
    const { setSignBox} = useContext(UserContext)
    const showBoxHandler = () => {
        setSignBox(!signBox)
    }
    return (
        <div className="intro-items">
            <div className="app-name">Testlo!</div>
            <div className="tagline">A online quiz conducting platform</div>
            <Button onClick={showBoxHandler} buttonType="default">REGISTER</Button>
            <img className="down-arrow" src={arrow} alt="arrow" />
        </div>
    )
}
export default Intro