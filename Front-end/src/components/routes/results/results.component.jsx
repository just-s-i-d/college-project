
import "./results.styles.scss"
import ClassSelect from "../../classselect/classselect.component"
import { UserContext } from "../../context/usercontext.component"
import { Fragment, useContext, useState, useEffect } from "react";
import DefaultDashboard from "../../defaultdashboard/defaultdashboard.component";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../utils/firebase/firebase.utils";
import { doc, getDoc } from "firebase/firestore";
import Table from "../../table/table.component";


const Results = () => {
    const [displayName, setDisplayName] = useState()
    const [accType, setAccType] = useState()
    const { isLeftNavOpen } = useContext(UserContext)
    const { setIsLeftNavOpen } = useContext(UserContext)
    const { isAddClassOpen } = useContext(UserContext)
    const { setIsAddClassOpen } = useContext(UserContext)
    const leftLinks = ["Classes" ,"Results"]
    const { uid } = useParams()
    const accountTypeHandler = async () => {
        const userDocRef = doc(db, "users", uid)
        const userSnapshot = await getDoc(userDocRef)
        const {accType, displayName } = userSnapshot.data()
        setAccType(accType)
        setDisplayName(displayName)
    }
    const popUpHandler = () => {
        setIsAddClassOpen(!isAddClassOpen)
    }
    const location = useLocation()
    const [classes, setClasses] = useState()
    useEffect(() => {
        accountTypeHandler()
        setIsLeftNavOpen(null)
            fetch(`http://localhost:3002/teacher/${uid}`)
                .then(response => response.json())
                .then(data => {
                    setClasses(data)
                })
    }, [])
    return (
        <>
            <DefaultDashboard displayName={displayName && displayName.split(" ")[0]} dashboard={location.pathname.slice(1).toLocaleUpperCase()} isAddClassOpen={isAddClassOpen} isLeftNavOpen={isLeftNavOpen} onClick={popUpHandler} data={leftLinks} accType={accType}/>
            <div className="result-container">
                <div className="select-class-container">
                    <ClassSelect classes={classes} accType={accType}/>
                    <Table accType={accType}/>
                </div>
            </div>
        </>
    )
}
export default Results