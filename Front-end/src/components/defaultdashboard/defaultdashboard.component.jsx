import { Fragment, useEffect } from "react"
import DashNavBar from "../dashboard-navbar/dash-navbar.component"
import AddClass from "../routes/teacher/addingclass/addingclass.component"
import LeftNavBar from "../leftnavbar/leftnavbar.component"
import QuizBox from "../routes/teacher/quizpopbox/quizpopbox.component"
import SearchClass from "../routes/student/searchclass/searchclass.component"
import { useContext } from "react"
import { UserContext } from "../context/usercontext.component"
const DefaultDashboard = (props) => {
    const { isAddClassOpen, isLeftNavOpen,
        isSearchClassOpen, isAddQuizOpen,
        onClick, dashboard, displayName, data,accType
    } = props
    const { setIsLeftNavOpen } = useContext(UserContext)
    useEffect(() => {
        setIsLeftNavOpen(null)
    },[]
    )
    return (
        <Fragment>
            <DashNavBar displayName={displayName} dashboard={dashboard} onClick={onClick} accType={accType}/>
            {isLeftNavOpen && <LeftNavBar links={data} accType={accType}/>}
            {isAddClassOpen && <AddClass />}
            {isSearchClassOpen && <SearchClass />}
            {isAddQuizOpen && <QuizBox />}
        </Fragment>
    )
}
export default DefaultDashboard