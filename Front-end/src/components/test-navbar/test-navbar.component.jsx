import "./test-navbar.styles.scss"

import UserNameProfile from "../usernameprofile/usernameprofile.component"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../utils/firebase/firebase.utils"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"


const TestNavBar = (props) => {
    const [displayName, setDisplayName] = useState()
    const { uid } = useParams()
    const accountTypeHandler = async () => {
        const userDocRef = doc(db, "users", uid)
        const userSnapshot = await getDoc(userDocRef)
        const { displayName } = userSnapshot.data()
        setDisplayName(displayName)
    }
    useEffect(() => {
        accountTypeHandler()
    }, [])
    const { quizName, quizTopic } = props
    return (
        <div className="testNavBar-container">
            <div className="test">{quizName}</div>
            <div className="subject">
                {quizTopic ? quizTopic : ""}
            </div>
            <UserNameProfile displayName={displayName && displayName.split(" ")[0]}/>
        </div>
    )
}
export default TestNavBar