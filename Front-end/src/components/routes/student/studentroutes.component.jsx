import { Route, Routes } from "react-router-dom"
import Student from "./student.component"

import Class from "../class/class.component"
import AnsQuizRoutes from "../../ansquiz/ansquizroutes.comonent"
import Instructions from "../../instructions/instructions.component"

import StudentResults from "../studentresults/studentresults.component"

const StudentRoutes = () => {
    return (
        <Routes>
            <Route index path="/Classes" element={<Student />} />
            <Route path="Results" element={<StudentResults />} />
            <Route path="Classes/class/:classCode" element={<Class />} />
            <Route path="Classes/class/:classCode/instructions/:quizCode" element={<Instructions/>}/>
            <Route path="Classes/class/:classCode/instructions/:quizCode/*" element={<AnsQuizRoutes />} />
        </Routes>
    )
}
export default StudentRoutes