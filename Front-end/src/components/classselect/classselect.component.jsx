import { useContext, useEffect, useState } from "react"
import "./classselect.styles.scss"
import Button from "../button/button.component"
import { ResultContext } from "../context/result.component"

const ClassSelect = ({ classes, accType }) => {
    const [selectedClass, setSelectedClass] = useState("")
    const [allQuizes, setQuizes] = useState()
    const [selectedQuiz, setSelectedQuiz] = useState()
    const { setResult } = useContext(ResultContext)
    const onChangeHandler = (event) => {
        const { value } = event.target
        setSelectedClass(value)
    }
    const onQuizChangeHandler = (event) => {
        const { value } = event.target
        setSelectedQuiz(value)
    }
    useEffect(() => {
        fetch("http://localhost:3002/showresult", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selectedClass
            })
        }).then(response => response.json())
            .then(data => setQuizes(data))

    }, [selectedClass])

    const onShowHandler = async (event) => {
        event.preventDefault()
        fetch("http://localhost:3002/getresult", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selectedClass, selectedQuiz
            })
        }).then(response => response.json())
            .then(data => {
                setResult(data)
            })

    }
    return (
        <form onSubmit={onShowHandler}>
            <select className="class-select" name="class" onChange={onChangeHandler}>
                <option disabled selected>Select Class</option>
                {classes && classes.map(d => <option value={d.classCode}>{`${d.className} (${d.classCode})`}</option>)}
            </select>
            <select className="class-select" name="quiz" onChange={onQuizChangeHandler}>
                <option disabled selected>Select Quiz</option>
                {allQuizes && allQuizes.map(d => <option value={d.quizCode}>{`${d.quizName} (${d.quizCode})`}</option>)}
            </select>
            <Button buttonType="submit" type="submit">Show</Button>
        </form>
    )
}
export default ClassSelect