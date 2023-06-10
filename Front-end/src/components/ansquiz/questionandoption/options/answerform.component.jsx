import Button from "../../../button/button.component"
import IndOption from "./indoption.component"

import "./answerform.styles.scss"
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { CurrentUserContext } from "../../../context/currentusercontext.component"
const defaultFormDetails = {
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: ""
}

const AnswerForm = ({ quizTotalQuestions }) => {
    const { quizTime } = useContext(CurrentUserContext)
    const { uid, classCode, quizCode } = useParams()
    let { questionNo } = useParams()
    const [formDetails, setFormDetails] = useState(defaultFormDetails)
    const [answer, setAnswer] = useState('');
    function handleOptionChange(event) {
        setAnswer(event.target.value);
    }

    useEffect(() => {

        fetch(`http://localhost:3002/student/${uid}/${classCode}/${quizCode}/${questionNo}`)
            .then(response => response.json()
            )
            .then(data => {
                setFormDetails(data)
            })
    }, [])
    const onNextHandler = async (event) => {
        event.preventDefault()
        if (questionNo == quizTotalQuestions) {
            toast.info("no more questions left")
        }
        else {
            fetch(`http://localhost:3002/student/${uid}/${classCode}/${quizCode}/${questionNo}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answer
                })
            }).then(response => response.text())
                .then(message => {
                    if (message === "Answer Recorded") {
                        toast.success(message)
                        questionNo = parseInt(questionNo) + 1
                        console.log(questionNo)
                        const newURL = `http://localhost:3000/student/${uid}/Classes/class/${classCode}/instructions/${quizCode}/${questionNo}`
                        window.location.replace(newURL)
                    }
                    else if (message === "Server Error") {
                        toast.error(message)
                    }
                })

        }
    }
    const onPreviousHandler = () => {
        if (questionNo == 1) {
            alert("Cannot go back ")
        } else {
            questionNo = parseInt(questionNo) - 1
            console.log(questionNo)
            const newURL = `http://localhost:3000/student/${uid}/Classes/class/${classCode}/instructions/${quizCode}/${questionNo}`
            window.location.replace(newURL)
        }
    }
    const onFinalSubmit = async () => {
        await fetch(`http://localhost:3002/student/${uid}/${classCode}/${quizCode}/${questionNo}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer
            })
        }).then(async () => {
            console.log("done")
            await fetch(`http://localhost:3002/student`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid, quizCode, classCode
                })
            })
                .then(response => console.log(response.json()))
            const newURL = `http://localhost:3000/student/${uid}/Classes/class/${classCode}`
            window.location.replace(newURL)
        })

    }
    // useEffect(() => {
    //     const handleTabChange = (event) => {
    //       // Display the warning message when the user switches tabs
    //       if (document.visibilityState === "hidden" || document.msHidden) {
    //         event.preventDefault();
    //         event.returnValue = "Are you sure you want to leave? Your progress may be lost.";
    //       }
    //     };
    
    //     document.addEventListener("visibilitychange", handleTabChange);
    //     document.addEventListener("msvisibilitychange", handleTabChange);
    
    //     return () => {
    //       document.removeEventListener("visibilitychange", handleTabChange);
    //       document.removeEventListener("msvisibilitychange", handleTabChange);
    //     };
    //   }, []);
    
    useEffect(() => {
        if (quizTime === 0) {
            console.log("quizTime is zero")
            // onFinalSubmit()
        }
    })
    return (
        <div className="options-container">
            <div>Question No. : {questionNo}</div>
            <div>{formDetails.question}</div>
            <form className="form-items-container" onSubmit={onNextHandler}>
                <div className="options"><IndOption id="A" name="answer" value="A" checked={answer === 'A'} onChange={handleOptionChange} required >{formDetails.optionA}</IndOption></div>
                <div className="options"><IndOption id="B" name="answer" value="B" checked={answer === 'B'} onChange={handleOptionChange} required>{formDetails.optionB}</IndOption></div>
                <div className="options"><IndOption id="C" name="answer" value="C" checked={answer === 'C'} onChange={handleOptionChange} required>{formDetails.optionC}</IndOption></div>
                <div className="options"><IndOption id="D" name="answer" value="D" checked={answer === 'D'} onChange={handleOptionChange} required>{formDetails.optionD}</IndOption></div>
                <div className="form-btn-container">
                    {/* <Button type="button" id="mark-review-btn">Marked For Review</Button> */}
                    <span className="next-prev-btn">
                        <Button buttonType="styled" type="button" onClick={onPreviousHandler}>Previous</Button>
                        <Button buttonType="styled" type="submit">Next</Button>
                    </span>
                    <Button buttonType="submit" type="button" onClick={onFinalSubmit}>Submit</Button>
                </div>
            </form>
        </div>
    )
}
export default AnswerForm

