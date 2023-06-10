import NavBar from "../../navbar/navbar.component"
import SocialCard from "../../socialcard/socialcard.component"
import Sid from "../../../assets/siddharth.jpg"
import ayush from "../../../assets/ayush.jpg"
import sanskar from "../../../assets/sanskar.jpg"
import "./aboutus.styles.scss"
import Footer from "../../footer/footer.component"
const AboutUs = () => {
    return (
        <>
            <NavBar />
            <div className="aboutus-main-container">
                <span className="text-container">Test Lo is a team of passionate developers dedicated to creating engaging and educational quiz experiences for users of all ages and interests. At TestLo we believe that learning should be fun and interactiveThe team is dedicated to creating engaging and profound user experience quiz for user of all ages and interests</span>
                <div className="social-cards-container">
                    <SocialCard displayName="Aayush Pandya" imgUrl={ayush} />
                    <SocialCard displayName="Siddharth Paneri" imgUrl={Sid} />
                    <SocialCard displayName="Sanskar Sharma" imgUrl={sanskar} />
                </div>
            </div>
            <Footer />
        </>
    )
}
export default AboutUs