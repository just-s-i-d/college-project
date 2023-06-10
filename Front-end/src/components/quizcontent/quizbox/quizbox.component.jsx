import { useParams } from "react-router-dom"
import "./quizbox.styles.scss"
import { toast } from "react-toastify"

const QuizBox = ({ clas, accType }) => {
    const { uid, classCode } = useParams()
    const { quizCode, quizName, quizTime, quizTopic, quizMarks } = clas
    const onClickHandler = async () => {
        if (accType === "student") {
            fetch(`http://localhost:3002/student/${uid}/${classCode}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quizCode
                })
            }).then(re => {
                console.log(re)
                return re.json()})
                .then(data => {
                    if (data.message!=="no data") {
                        toast.info("You have already attempted this quiz. You cannot attempt again")
                    }
                    else {
                        const newPath = `${classCode}/instructions/${quizCode}`;
                        const newURL = new URL(newPath, window.location.href).href;
                        window.location.assign(newURL);
                    }
                })
        }
        else if(accType==="teacher") {
            const newPath = `${classCode}/${quizCode}/1`;
            const newURL = new URL(newPath, window.location.href).href;
            window.location.href = newURL;
        }

    }
    return (
        // <Link to={accType == "teacher" ? `${quizCode}/1` : `instructions/${quizCode}`} >
        <div className="content-box" onClick={onClickHandler}>
            Quiz Name: {quizName}<br />Subject: {quizTopic}<br />Time(Minutes) :{quizTime}<br />Total Marks {quizMarks}
        </div>
        // </Link>
    )
}
export default QuizBox