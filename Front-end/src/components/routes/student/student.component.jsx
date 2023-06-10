import { Fragment,useEffect, useState } from "react";
import { UserContext } from "../../context/usercontext.component";
import { useContext } from "react";
import DefaultDashboard from "../../defaultdashboard/defaultdashboard.component";
import MainContent from "../../maincontent/maincontent.component";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
const Student = () => {
    const { isLeftNavOpen } = useContext(UserContext)
    const [displayName, setDisplayName] = useState()
    const [accType, setAccType] = useState()
    const { isSearchClassOpen } = useContext(UserContext)
    const { setIsSearchClassOpen } = useContext(UserContext)
    const [details,setDetails]=useState([])
    const studentLinks = ["Classes", "Results"]
    const { uid } = useParams()
    const accountTypeHandler = async () => {
        const userDocRef = doc(db, "users", uid)
        const userSnapshot = await getDoc(userDocRef)
        const { accType,displayName } = userSnapshot.data()
        setAccType(accType)
        setDisplayName(displayName)
    }
    const popUpHandler=()=>{
        setIsSearchClassOpen(!isSearchClassOpen)
    }
    useEffect(()=>{
        accountTypeHandler()
        fetch(`http://localhost:3002/student/${uid}`)
        .then(response=>response.json())
        .then(data=>{setDetails(data)})
    },[])
    return (
        <Fragment>
            <DefaultDashboard displayName={displayName && displayName.split(" ")[0]} dashboard="Student" isLeftNavOpen={isLeftNavOpen} isSearchClassOpen={isSearchClassOpen} onClick={popUpHandler} data={studentLinks} accType={accType}/>
            <MainContent data={details}/>
        </Fragment>
    )
}
export default Student