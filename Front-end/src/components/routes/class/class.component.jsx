import DefaultDashboard from "../../defaultdashboard/defaultdashboard.component"
import { UserContext } from "../../context/usercontext.component"
import { Fragment, useContext, useEffect, useState } from "react"
import "./class.styles.scss"
import QuizContent from "../../quizcontent/quizcontent.component"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../utils/firebase/firebase.utils"

const Class = () => {
    const teacherLinks = ["Classes", "Results"]
    const studentLinks = ["Classes", "Results"]
    const { uid, classCode } = useParams()
    const { isLeftNavOpen } = useContext(UserContext)
    const { isAddQuizOpen } = useContext(UserContext)
    const { setIsAddQuizOpen } = useContext(UserContext)
    const [details, setDetails] = useState([])
    const [displayName, setDisplayName] = useState()
    const [accType, setAccType] = useState()
    const popUpHandler = () => {
        setIsAddQuizOpen(!isAddQuizOpen)
    }
    const accountTypeHandler = async () => {
        const userDocRef = doc(db, "users", uid)
        const userSnapshot = await getDoc(userDocRef)
        const { accType, displayName } = userSnapshot.data()
        setAccType(accType)
        setDisplayName(displayName)
    }

    useEffect(() => {
        accountTypeHandler()
        if(accType==="teacher"){
            fetch(`http://localhost:3002/teacher/${uid}/${classCode}`)
            .then(res => res.json())
            .then(data => {
                setDetails(data)
            })
        }else {
            fetch(`http://localhost:3002/student/${uid}/${classCode}`)
            .then(res => res.json())
            .then(data => {
                setDetails(data)
            })
        }
       
    }, [])
    return (
        <Fragment>
            <DefaultDashboard dashboard="Teacher" displayName={displayName && displayName.split(" ")[0]} isLeftNavOpen={isLeftNavOpen} isAddQuizOpen={isAddQuizOpen} onClick={popUpHandler} data={accType==="teacher"?teacherLinks:studentLinks} accType={accType}/>
            <QuizContent data={details} accType={accType}/>
        </Fragment>
    )
}
export default Class