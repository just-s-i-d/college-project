import Button from "../../../button/button.component"
import InputLabel from "./inputlabel/inputlabel.component"
import QuizForm from "./quizboxform/quizform.component"
import "./quizpopbox.styles.scss"
const QuizBox = () => {
    return (
        <div className="quiz-popup-box-container">
            <div className="add-quiz-form-container">
                <QuizForm/>
            </div>
        </div>
    )
}
export default QuizBox