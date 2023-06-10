
import "./quizcontent.styles.scss"
import QuizBox from "./quizbox/quizbox.component"


const QuizContent = ({ data,accType }) => {
    const { quizes } = data
    return (
            <div className="quiz-content">
                <div className="quiz-content-container">
                    {quizes && quizes.map((d) => <QuizBox clas={d} accType={accType}/>)}
                </div>
                
            </div>
    )
}
export default QuizContent