import { Fragment, useContext, useState, useEffect } from "react";
import "./teacher.styles.scss"
import { UserContext } from "../../context/usercontext.component";
import DefaultDashboard from "../../defaultdashboard/defaultdashboard.component";
import { useLocation, useParams } from "react-router-dom";
import MainContent from "../../maincontent/maincontent.component";
import { db } from "../../utils/firebase/firebase.utils";
import { doc, getDoc } from "firebase/firestore";





const Teacher = () => {
    const [displayName, setDisplayName] = useState()
    const [accType, setAccType] = useState()
    const { isLeftNavOpen } = useContext(UserContext)
    const { setIsLeftNavOpen } = useContext(UserContext)
    const { isAddClassOpen } = useContext(UserContext)
    const { setIsAddClassOpen } = useContext(UserContext)
    const leftLinks = ["Classes", "Results"]
    const { uid } = useParams()
    const accountTypeHandler = async () => {
        const userDocRef = doc(db, "users", uid)
        const userSnapshot = await getDoc(userDocRef)
        const { accType,displayName } = userSnapshot.data()
        setAccType(accType)
        setDisplayName(displayName)
    }
    const popUpHandler = () => {
        setIsAddClassOpen(!isAddClassOpen)
    }
    const location = useLocation()
    const [classes, setClasses] = useState([])
    useEffect(() => {
        setIsLeftNavOpen(null)
        accountTypeHandler()
        fetch(`http://localhost:3002/teacher/${uid}`)
            .then(response => response.json())
            .then(data => { setClasses(data) })
    }, [])
    return (
        <Fragment>
            <DefaultDashboard displayName={displayName && displayName.split(" ")[0]} dashboard={location.pathname.slice(1).toLocaleUpperCase()} isAddClassOpen={isAddClassOpen} isLeftNavOpen={isLeftNavOpen} onClick={popUpHandler} data={leftLinks} accType={accType} />
            <MainContent data={classes} />
            {/* <QuizBox /> */}
        </Fragment>
    )
}
export default Teacher