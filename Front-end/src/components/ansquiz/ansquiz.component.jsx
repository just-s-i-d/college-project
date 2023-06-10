import { Fragment, useContext, useEffect, useState } from "react"
import TestNavBar from "../test-navbar/test-navbar.component"
import RightSection from "../rightsection/rigthsection.component"
import "./ansquiz.styles.scss"
// import Bottom from "./bottom/bottom.component"
import { useParams } from "react-router-dom"
import AnswerForm from "./questionandoption/options/answerform.component"
import Stopwatch from "../stopwatch/stopwatch.component"
import PerQuestion from "../perQuestion/perquestion.component"
import { CurrentUserContext } from "../context/currentusercontext.component"
// import { doc, getDoc } from "firebase/firestore"
// import { db } from "../utils/firebase/firebase.utils"
const AnsQuiz = () => {
    // const [accType, setAccType] = useState()
    // const accountTypeHandler = async () => {
    //     const userDocRef = doc(db, "users", uid)
    //     const userSnapshot = await getDoc(userDocRef)
    //     const { accType } = userSnapshot.data()
    //     setAccType(accType)
    // }
    const { uid, classCode, quizCode } = useParams()
    const [formDetails, setFormDetails] = useState()
    useEffect(() => {
        // accountTypeHandler()
        const temp = async () => {
            const response = await fetch(`http://localhost:3002/student/${uid}/${classCode}/${quizCode}`)
            const data = await response.json()
            setFormDetails(data)
            if (data) {
                const now = new Date()
                const {quizTime}=data
                const newEndTime = new Date(now.getTime() + quizTime * 60 * 1000); // 30 minutes from now
                sessionStorage.setItem('endTime', newEndTime);
            }
        }
        temp()
    }, [])
    return (
        <Fragment>
            <TestNavBar quizName={formDetails && formDetails.quizName} quizTopic={formDetails && formDetails.quizTopic} />
            <RightSection totalQuestions={formDetails && formDetails.quizTotalQuestions} />
            <PerQuestion />
            <Stopwatch quizTime={formDetails && formDetails.quizTime} />
            <div className="ques-opt-container">
                <AnswerForm quizTotalQuestions={formDetails && formDetails.quizTotalQuestions} />
            </div>
            {/* <Bottom /> */}
        </Fragment>
    )
}
export default AnsQuiz