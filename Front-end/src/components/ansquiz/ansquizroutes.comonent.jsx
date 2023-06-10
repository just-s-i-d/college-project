import { Route, Routes } from "react-router-dom"
import AnsQuiz from "./ansquiz.component"

const AnsQuizRoutes=()=>{
    return(
        <Routes>
            <Route index path="/" element={<AnsQuiz />}/>
             <Route path=":questionNo" element={<AnsQuiz/>}/>
        </Routes>
    )
}
export default AnsQuizRoutes