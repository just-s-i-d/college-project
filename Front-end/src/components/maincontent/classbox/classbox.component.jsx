import { Link } from "react-router-dom"

import "./classbox.styles.scss"
import { useContext } from "react"
import { UserContext } from "../../context/usercontext.component"
import DeleteMenu from "../../deletemenu/deletemenu.component"

const ClassBox = ({ clas }) => {

    const { classCode, className, classSubject } = clas
    return (
        <Link to={`class/${classCode}`}>
            <div className="content-box">

                Class Name: {className}<br />Subject: {classSubject}<br />Code: {classCode}
            </div>
        </Link>
    )
}
export default ClassBox