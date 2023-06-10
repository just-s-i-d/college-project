import { useNavigate, useParams } from "react-router-dom"
import Button from "../button/button.component"
import "./instructions.styles.scss"
import DefaultDashboard from "../defaultdashboard/defaultdashboard.component"
import {  useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../utils/firebase/firebase.utils"

const Instructions = () => {
    const navigate = useNavigate()
    const [displayName, setDisplayName] = useState()
    const { uid, classCode, quizCode } = useParams()
    const [formDetails, setFormDetails] = useState()
    useEffect(() => {
        const temp=async()=>{
            await fetch(`http://localhost:3002/student/${uid}/${classCode}/${quizCode}`)
            .then(response =>response.json())
            .then(data => {
                
                setFormDetails(data)  
                sessionStorage.setItem("marks",data.perQuestion) 
            })
        }
        temp()
    }, [])
    const accountTypeHandler = async () => {
        const userDocRef = doc(db, "users", uid)
        const userSnapshot = await getDoc(userDocRef)
        const { accType, displayName } = userSnapshot.data()
        setDisplayName(displayName)
    }
    useEffect(() => {
        accountTypeHandler()
    }, [])
    const onCancelHandler=()=>{
        const newURL = `http://localhost:3000/student/${uid}/Classes/class/${classCode}`
        window.location.replace(newURL)
    }
    const onStartTestHandler = () => {
        navigate("1")
    }
    return (
        <>
            <DefaultDashboard dashboard="Student" displayName={displayName && displayName.split(" ")[0]} />
            <div className="instruction-container">
                <div className="instructions">
                    <p>Read each question carefully and choose the best answer to each one.
                        <li>There are a total {formDetails&&formDetails.quizTotalQuestions} questions.</li>
                        <li>The quiz will be of {formDetails&&formDetails.quizTime} minutes duration.</li>
                        <li>The time will start the moment you click the Start Test button.</li>
                        <li>Click on Next button to move next question.</li>
                        <li>Please note that you will not be able to go back to any of the previous question after clicking Next button.</li>
                        <li>Click on Submit Test button on completion of the quiz.</li>
                    </p>
                </div>
                <span className="btn-container">
                    <Button buttonType="styled" type="button" onClick={onCancelHandler}>Cancel</Button>
                    <Button buttonType="submit" onClick={onStartTestHandler} >Start Test</Button>
                </span>
            </div>
        </>
    )
}
export default Instructions