// import { useParams } from "react-router-dom"
// import Circle from "../circle/circle.component"
// import "./rightsection.styles.scss"
// import { useEffect } from "react"
// const RightSection = ({ totalQuestions, accType }) => {
//     const { uid, classCode, quizCode } = useParams()
//     const questionLinks = []
//     const questionNoGenertor = () => {
//         for (let i = 1; i <= totalQuestions; i++) {
//             const obj = { questionNo: i }
//             questionLinks.push(obj)
//         }
//     }
//     const onHandler = (questionNo) => {
//         console.log(questionNo)
//         const newURL = `http://localhost:3000/student/${uid}/Classes/class/${classCode}/instructions/${questionNo}`
//         window.location.href = newURL
//     }
//     // useEffect(() => {
//     //     questionNoGenertor()
//     // }, [])
//     return (
//         <div className="right-section-container">
//             <div></div>
//             <hr className="division" />
//             <div className="question-no-container">
//                 {questionNoGenertor()}
//                 {questionLinks.map(q => <Circle onClick={() => onHandler(q.questionNo)}>{q.questionNo}</Circle>)}
//             </div>
//         </div>
//     )
// }
// export default RightSection


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Circle from "../circle/circle.component";
import "./rightsection.styles.scss";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase/firebase.utils";

const RightSection = ({ totalQuestions }) => {
    const { uid, classCode, quizCode } = useParams();
    const questionLinks = [];
    const [accType, setAccType] = useState()
    const accountTypeHandler = async () => {
        const userDocRef = doc(db, "users", uid)
        const userSnapshot = await getDoc(userDocRef)
        const { accType } = userSnapshot.data()
        setAccType(accType)
    }
    const questionNoGenerator = () => {
        for (let i = 1; i <= totalQuestions; i++) {
            const obj = { questionNo: i };
            questionLinks.push(obj);
        }
    }
   
    const onHandler = (questionNo) => {
        console.log(accType)
        if (accType === "student") {
            window.location.replace(`http://localhost:3000/student/${uid}/Classes/class/${classCode}/instructions/${quizCode}/${questionNo}`)
        }
        else if (accType === "teacher") {
            window.location.replace(`http://localhost:3000/teacher/${uid}/Classes/class/${classCode}/${quizCode}/${questionNo}`)
        }
    };
    useEffect(() => {
        accountTypeHandler()
    }, [])
    return (
        <>
            {questionNoGenerator()}
            <div className="right-section-container">
                <div></div>
                <hr className="division" />
                <div className="question-no-container">
                    {questionLinks.map((q) => (
                        <Circle onClick={() => onHandler(q.questionNo)}>{q.questionNo}</Circle>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RightSection;
