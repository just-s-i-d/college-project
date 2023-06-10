import { Fragment } from "react"

const IndOption = ({id,children,...props}) => {
    return (
        <Fragment>
            <input type="radio" id={id} {...props}/>
            <label htmlFor={id}>{children}</label>
        </Fragment>
    )
}
export default IndOption