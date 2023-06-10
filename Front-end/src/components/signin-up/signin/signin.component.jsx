import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import Button from "../../button/button.component"
import { db, signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils"

import { doc, getDoc } from "firebase/firestore"
import { CurrentUserContext } from "../../context/currentusercontext.component"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../context/usercontext.component"
const defaultFormFields = {
    email: "",
    password: ""
}
const SignIn = () => {
    const navigate = useNavigate()
    const [formDetails, setFormDetails] = useState(defaultFormFields)
    const { email, password } = formDetails
    const resetFormFields = () => setFormDetails(defaultFormFields)
    const { setCurrentUser } = useContext(CurrentUserContext)
    const { signBox } = useContext(UserContext)
    const { setSignBox } = useContext(UserContext)
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormDetails({ ...formDetails, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await signInAuthWithEmailAndPassword(email, password)
            console.log(response)
            const { user } = response
            setCurrentUser(user)
            const { uid } = user
            const userDocRef = doc(db, "users", user.uid)
            const userSnapshot = await getDoc(userDocRef)
            const { accType } = userSnapshot.data()
            toast.success("Login Successfull")
            setTimeout(()=>{
                navigate(`${accType}/${uid}/Classes`)
                resetFormFields()
            },3000)

        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password": toast.error("Incorrect Password")
                    break
                case "auth/user-not-found": toast.error("No such user found")
                    break
                default: toast.error("There was an error in logging in ")
            }
        }

    }
    return (
        <><div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                {/* <div className="social-container">
                    <Link className="social"><i className="fab fa-google-plus-g"></i></Link>
                </div> */}
                <span>or use your account</span>
                <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                <Link>Forgot your password?</Link>
                <button type="submit" className="sign-in-up">Sign In</button>
            </form>
        </div>
        </>

    )
}
export default SignIn