import "./bottom.styles.scss"
import QuesLabel from "./queslabels/queslabel.component"
const Bottom=()=>{
    return(

        <div className="bottom-border">
            <QuesLabel ansType="attempt"/>
            <QuesLabel ansType="mark"/>
            <QuesLabel ansType="notAttempt"/>
            <QuesLabel ansType="notVisited"/>
        </div>

    )
}
export default Bottom