import "./formques.styles.scss"
import Input from "../../input/input.component"
import Button from "../../button/button.component"
import RightSection from "../../rightsection/rigthsection.component"
import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import TestNavBar from "../../test-navbar/test-navbar.component"
import { toast } from "react-toastify"
// import { doc, getDoc } from "firebase/firestore"
// import { db } from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: ""
}
const FormQues = () => {
    // const [accType, setAccType] = useState()
    // const accountTypeHandler = async () => {
    //     const userDocRef = doc(db, "users", uid)
    //     const userSnapshot = await getDoc(userDocRef)
    //     const { accType } = userSnapshot.data()
    //     setAccType(accType)
    // }
    const [questionsFields, setQuestionFields] = useState(defaultFormFields)
    const [quizData, setQuizData] = useState()
    const { uid, classCode, quizCode } = useParams()
    let { questionNo } = useParams()

    // const {
    //     question,
    //     optionA,
    //     optionB,
    //     optionC,
    //     optionD,
    //     answer } = questionsFields
    const handlerChange = (e) => {
        const { name, value } = e.target
        setQuestionFields({ ...questionsFields, [name]: value })
    }

    const questionFormSubmitHandler = async (event) => {
        event.preventDefault()
        if (questionNo == quizData.quizTotalQuestions) {
            toast.info("No More questions left")
        }
        else {
            await fetch(`http://localhost:3002/teacher/${uid}/${classCode}/${quizCode}/${questionNo}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...questionsFields, questionNo
                })
            }).then(response => response.text())
                .then(message => {
                    if (message === "Question Saved") {
                        toast.success(message);
                        setTimeout(() => {
                            questionNo = parseInt(questionNo) + 1
                            const newURL = `http://localhost:3000/teacher/${uid}/Classes/class/${classCode}/${quizCode}/${questionNo}`
                            window.location.replace(newURL)
                        }, 2000)
                    }
                    else toast.error(message)
                })

        }

    }
    const finalFormSubmitHandler = async (event) => {
        event.preventDefault()
        fetch(`http://localhost:3002/teacher/${uid}/${classCode}/${quizCode}/${questionNo}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...questionsFields, questionNo
            })
        }).then(response => response.text())
            .then(message => {
                if (message === "Question Saved") {
                    toast.success(message);

                }
                else toast.error(message)
            })
        fetch(`http://localhost:3002/teacher/${uid}/${classCode}/${quizCode}`)
            .then(res=>res.text())
            .then(mes => {
                console.log("inside")
                if (mes === "Quiz Created Succesfully") {
                    console.log(mes)
                    toast.success(mes)
                    setTimeout(() => {
                        window.location.href = `/teacher/${uid}/Classes/class/${classCode}`
                    }, 2000)
                }
            })
    }
    const onPreviousHandler = () => {
        if (questionNo == 1) {
            toast.info("Cannot go back ")
        } else {
            questionNo = parseInt(questionNo) - 1
            console.log(questionNo)
            const newURL = `http://localhost:3000/teacher/${uid}/Classes/class/${classCode}/${quizCode}/${questionNo}`
            window.location.replace(newURL)
        }
    }
    useEffect(() => {
        fetch(`http://localhost:3002/teacher/${uid}/${classCode}/${quizCode}`, {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

            })
        }).then((response) => response.json())
            .then((data) => {
                setQuizData(data[0])
            })
    }, [])


    return (
        <div className="add-question-page-container">
            <TestNavBar quizName={`Question No. : ${questionNo}`} />
            <RightSection totalQuestions={quizData && quizData.quizTotalQuestions}/>
            <div className="form-ques-container">
                <form className="form-items-container" onSubmit={questionFormSubmitHandler}>
                    <label htmlFor="ques">Enter the question here:</label>
                    <textarea id="ques" name="question" onChange={handlerChange} required />
                    <label htmlFor="A">Option A:</label>
                    <Input type="text" id="A" name="optionA" onChange={handlerChange} required />
                    <label htmlFor="B">Option B:</label>
                    <Input type="text" id="B" name="optionB" onChange={handlerChange} required />
                    <label htmlFor="C">Option C:</label>
                    <Input type="text" id="C" name="optionC" onChange={handlerChange} required />
                    <label htmlFor="D">Option D:</label>
                    <Input type="text" id="D" name="optionD" onChange={handlerChange} required />
                    <label htmlFor="ans">Answer</label>
                    <select id="ans" name="answer" onChange={handlerChange} required>
                        <option selected disabled>Select the Correct Answer</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                    <div className="form-btn-container">
                        <div className="btns">
                            <Button buttonType="styled" type="button" onClick={onPreviousHandler}>Previous</Button>
                            <Button buttonType="styled" type="submit">Next</Button>
                        </div>
                    </div>
                </form>
            </div>
            <Button buttonType="submit" id="final-submit" onClick={finalFormSubmitHandler}>Submit</Button>
        </div>

    )
}
export default FormQues