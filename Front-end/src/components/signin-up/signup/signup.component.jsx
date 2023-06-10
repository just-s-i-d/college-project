import { Link, useNavigate } from "react-router-dom"
import { createUserAuthWithEmailAndPassword, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { useContext, useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'firebase/auth';
import { CurrentUserContext } from "../../context/currentusercontext.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    accType: ""
}

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, accType } = formFields
    const signInWithGoogle = async () => {
        const response = await signInWithGoogleRedirect()
        console.log(response)
    }
    const { setCurrentUser } = useContext(CurrentUserContext)
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }
    const navigate = useNavigate()
    const resetFormFields = () => setFormFields(defaultFormFields)
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { user } = await createUserAuthWithEmailAndPassword(email, password)
            setCurrentUser(user)
            await createUserDocumentFromAuth(user, { displayName, accType })
            const { uid } = user
            fetch("http://localhost:3002/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, displayName, accType, uid
                })
            }).then((response) => response.text())
                .then((message) => {
                    if (message === "Something went wrong") toast.error(message)
                    else {
                        toast.success("Sign Up Successfull,logging in")
                        setTimeout(() => {
                            navigate(`${accType}/${uid}/Classes`)
                        }, 3000)
                        resetFormFields()
                    }
                })

        } catch (error) {
            if (error.code === "auth/email-already-in-use") toast.error("Email is already in use ")
            toast.error("There was an error in logging in ")
        }
    }
    return (
        <>
            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    {/* <ul className="social-container">
                        <Link className="social" ><li><i className="fab fa-google-plus-g" aria-hidden="true" onClick={signInWithGoogle}></i></li></Link>
                    </ul> */}
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" name="displayName" onChange={handleChange} required />
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
                    <select name="accType" id="type" required onChange={handleChange}>
                        <option value="default" selected disabled>Select account user</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <button type="submit" className="sign-in-up">Sign Up</button>
                </form>
            </div>
        </>
    )
}
export default SignUp