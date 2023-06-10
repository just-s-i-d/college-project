import "./circle.styles.scss"
const Circle=({children,...otherProps})=>{
    return(
        <span {...otherProps} className="question-circle-container">{children}</span>
    )
}
export default Circle