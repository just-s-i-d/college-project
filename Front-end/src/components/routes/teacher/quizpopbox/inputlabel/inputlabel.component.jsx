import "./inputlabel.styles.scss"
import Input from "../../../../input/input.component"
const InputLabel = (props) => {
    const {id,children,...otherprops}=props
    return (
        <div className="input-label-container">
            <label for={id}>{children}</label>
            <Input {...otherprops} id={id} />
        </div>
    )
}
export default InputLabel