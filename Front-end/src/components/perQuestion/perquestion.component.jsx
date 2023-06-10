
import "./perquestion.styles.scss"

const PerQuestion=()=>{
    const perQuestion=sessionStorage.getItem("marks")
    return(
        <span className="marks-per-question">Marks per Question: {perQuestion}</span>
    )
}
export default PerQuestion