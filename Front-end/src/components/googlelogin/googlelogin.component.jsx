import { useState } from "react"
import "./googlelogin.styles.scss"

const defaultFields = {
    displayName: "",
    accType: ""
}
const GoogleLogin = () => {
    const [formFields, setFormFields] = useState(defaultFields)
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({ ...formFields, [name]: value })
    }
    const formSubmitHandler = async (event) => {
        event.preventDefault()
        console.log(formFields)
    }
    return (
        <div className="google-login-container">
            <div className="logo">
                <img src="https://ssl.gstatic.com/accounts/ui/logo_2x.png" alt="Google Icon" />
            </div>

            <div className="intro">
                <h1>One account. All of Google.</h1>
                <h3>Additional Information</h3>
            </div>
            <form className="profile" onSubmit={formSubmitHandler}>
                <label htmlFor="role">Role:</label>
                <select id="role" name="accType" defaultValue="default" required onChange={handleChange}>
                    <option value="default" disabled>Select your role</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>
                <br />
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="displayName" required onChange={handleChange} />
                <br />
                <button id="create" type="submit">Create Account</button>
            </form>
        </div>
    )
}
export default GoogleLogin