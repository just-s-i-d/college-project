import "./socialcard.styles.scss"
import { Link } from "react-router-dom"
const SocialCard=({imgUrl,displayName})=>{
    return(
        <div class="card">
        <div class="img-bx">
            <img src={imgUrl} alt="img" />
        </div>
        <div class="content">
            <div class="detail">
                <h2>{displayName}<br /><span>Computer Science Engineer</span></h2>
                <ul class="sci">
                    <li>
                        <Link><i class="fab fa-twitter"></i></Link>
                    </li>
                    <li>
                        <Link><i class="fab fa-linkedin-in"></i></Link>
                    </li>
                    <li>
                        <Link><i class="fab fa-instagram"></i></Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}
export default SocialCard