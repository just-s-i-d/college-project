import { UserContext } from "../../../../context/usercontext.component"
import { useContext, useState } from "react"
import InputLabel from "../inputlabel/inputlabel.component"
import Button from "../../../../button/button.component"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const defaultFormFields = {
    quizName: "",
    quizTopic: "",
    quizMarks: Number,
    quizTotalQuestions: Number,
    quizTime: Number
}
const QuizForm = () => {
    const { isAddQuizOpen } = useContext(UserContext)
    const { uid, classCode } = useParams()
    const { setIsAddQuizOpen } = useContext(UserContext)
    const popUpHandler = () => {
        setIsAddQuizOpen(!isAddQuizOpen)
    }
    const [formFields, setFormfields] = useState(defaultFormFields)
    const resetFormFields=()=>setFormfields(defaultFormFields)
    const handlerchange = (e) => {
        const { name, value } = e.target
        setFormfields({ ...formFields, [name]: value })
    }
    const quizFormSubmitHandler = async (e) => {
        e.preventDefault()
        // const { quizName, quizTopic, quizMarks, quizTotalQuestions, quizTime } = formFields
       fetch(`http://localhost:3002/teacher/${uid}/${classCode}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formFields
            })
        }).then(response=>response.text())
        .then(message=>{
            if(message==="Quiz added"){
                toast.success(message);
                setTimeout(()=>{
                    window.location.reload();
                    resetFormFields()
                },3000)
            }
            else toast.error(message)
        })
    }
    return (
        <form className="form-container" onSubmit={quizFormSubmitHandler}>
            <h2>Add New Quiz</h2>
            <InputLabel type="text" placeholder="Enter the Quiz Name" required name="quizName" id="qname" onChange={handlerchange}>Quiz Name : </InputLabel>
            <br />
            <InputLabel type="text" placeholder="Enter the Topic" required name="quizTopic" id="subname" onChange={handlerchange}>Topic Name :</InputLabel>
            <br />
            <InputLabel type="number" name="quizMarks" id="marks" step={5} min={5} max={100} required placeholder="0" onChange={handlerchange}>Total Marks :</InputLabel>
            <br />
            <InputLabel type="number" name="quizTime" id="time" step={5} min={5} max={180} required placeholder="0"  onChange={handlerchange}>Time (In Minutes) :</InputLabel>
            <br/>
            <InputLabel type="number" name="quizTotalQuestions" id="questions" step={5} min={5} max={100} required placeholder="0"  onChange={handlerchange}>Total Questions :</InputLabel>
            <div className="btns-container">
                <Button buttonType="styled" type="button" onClick={popUpHandler}>Cancel</Button>
                <Button buttonType="submit" type="submit">Submit</Button>
            </div>
        </form>
    )
}
export default QuizForm