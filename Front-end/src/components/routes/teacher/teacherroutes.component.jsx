import { Routes, Route } from "react-router-dom"
import Teacher from "./teacher.component"
import AddQues from "../../addquestion/addques.component"
import QuizBox from "./quizpopbox/quizpopbox.component"
import Class from "../class/class.component"
import Results from "../results/results.component"

const TeacherRoutes = () => {
    return (
        <Routes>
            <Route index path="/Classes" element={<Teacher />} />
            <Route path="Results" element={<Results />} />
            <Route path="Classes/class/:classCode" element={<Class />} />
            <Route path="Classes/class/:classCode/:quizCode/*" element={<AddQues />} />
        </Routes>
    )
}
export default TeacherRoutes