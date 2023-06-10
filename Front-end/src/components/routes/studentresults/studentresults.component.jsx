
import "./studentresults.styles.scss"
import ClassSelect from "../../classselect/classselect.component"
import { UserContext } from "../../context/usercontext.component"
import { Fragment, useContext, useState, useEffect } from "react";
import DefaultDashboard from "../../defaultdashboard/defaultdashboard.component";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../utils/firebase/firebase.utils";
import { doc, getDoc } from "firebase/firestore";
import Table from "../../table/table.component";
import Button from "../../button/button.component";
import { ResultContext } from "../../context/result.component";


const StudentResults = () => {
    const [displayName, setDisplayName] = useState()
    const [accType, setAccType] = useState()
    const [selectedClass,setSelectedClass]=useState()
    const { setResult } = useContext(ResultContext)
    const { isLeftNavOpen } = useContext(UserContext)
    const { setIsLeftNavOpen } = useContext(UserContext)
    const { isAddClassOpen } = useContext(UserContext)
    const { setIsAddClassOpen } = useContext(UserContext)
    const studentLinks = ["Classes", "Results"]
    const { uid } = useParams()
    const onChangeHandler = (event) => {
        const { value } = event.target
        setSelectedClass(value)
    }
    const accountTypeHandler = async () => {
        const userDocRef = doc(db, "users", uid)
        const userSnapshot = await getDoc(userDocRef)
        const { accType, displayName } = userSnapshot.data()
        setAccType(accType)
        setDisplayName(displayName)
    }
    const popUpHandler = () => {
        setIsAddClassOpen(!isAddClassOpen)
    }
    const location = useLocation()
    const [classes, setClasses] = useState()
    const onShowHandler = async (event) => {
        event.preventDefault()
        fetch("http://localhost:3002/studentgetresult", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selectedClass, uid
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setResult(data)
            })

    }
    useEffect(() => {
        accountTypeHandler()
        setIsLeftNavOpen(null)
        fetch(`http://localhost:3002/student/${uid}`)
            .then(response => response.json())
            .then(data => {
                setClasses(data)
            })
    }, [])
    return (
        <>
            <DefaultDashboard displayName={displayName && displayName.split(" ")[0]} dashboard={location.pathname.slice(1).toLocaleUpperCase()} isAddClassOpen={isAddClassOpen} isLeftNavOpen={isLeftNavOpen} onClick={popUpHandler} data={studentLinks} accType={accType}/>
            <div className="result-container">
                <div className="select-class-container">
                    <form onSubmit={onShowHandler}>
                        <select className="class-select" name="class" onChange={onChangeHandler}>
                            <option disabled selected>Select Class</option>
                            {classes && classes.map(d => <option value={d.classCode}>{`${d.className} (${d.classCode})`}</option>)}
                        </select>
                        <Button buttonType="submit" type="submit">Show</Button>
                    </form>
                    <Table accType={accType}/>
                </div>
            </div>
        </>
    )
}
export default StudentResults