import { Link } from "react-router-dom"
import "./footer.styles.scss"
const Footer = () => {
    return (
        <div className="footer-container">
            <div className="app-name">Testlo!</div>
            <div className="sub-footer">
            <span className="contact-us-container">
                <span className="heading">Contact Us</span>
                <span>Teslo@Teslo.com</span>
                <span>Mobile: 99xxxxx600</span>
            </span>
            <span className="terms">Terms and Conditions</span>
            </div>
            <div className="the-end"><span className="copyright">©</span>Copyright <b>Testlo!</b> All Rights Reserved </div>
        </div >
    )
}
export default Footer

