
import FormQues from "./formques/formques.component"
import "./addques.styles.scss"

import {Routes,Route} from "react-router-dom"
const AddQues = () => {
    return (
            <Routes>
             <Route index path="/" element={<FormQues />}/>
             <Route path=":questionNo" element={<FormQues/>}/>
            </Routes>
    )
}
export default AddQues