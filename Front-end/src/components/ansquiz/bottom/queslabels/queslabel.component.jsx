import "./queslabel.styles.scss"
const labels={
    attempt:"Attempted",
    mark :"Mark for review",
    notAttempt:"Unattempted",
    notVisited:"Not Visited"
}
const QuesLabel=(props)=>{
    const {ansType}=props
    return (
        <span className="ques-label-container">
            <div className={`circle ${ansType}`} />
            <span>{labels[ansType]}</span>
        </span>
    )
}
export default QuesLabel