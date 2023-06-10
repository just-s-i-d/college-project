import Button from "../../../button/button.component"
import { useState } from "react"
import Input from "../../../input/input.component"
import { useContext } from "react"
import { UserContext } from "../../../context/usercontext.component"
import "./addingclass.styles.scss"
import { useParams } from "react-router-dom"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultFormFields = {
    className: "",
    classSubject: "",
    classDescription: ""
}
const AddClass = () => {
    const { isAddClassOpen } = useContext(UserContext)
    const { setIsAddClassOpen } = useContext(UserContext)
    const { uid } = useParams()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => setFormFields(defaultFormFields)
    const addClassFormSubmitHandler = async (event) => {
        event.preventDefault()
    
        fetch(`http://localhost:3002/teacher/${uid}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formFields
            })
        }).then(response=>response.text())
        .then(message=>{
            if(message==="Class created"){
                toast.success(message);
                setTimeout(()=>{
                    window.location.reload();
                    resetFormFields()
                },3000)
            }
            else toast.error(message)
        })
    }
    const closingAddClassHandler = () => {
        setIsAddClassOpen(!isAddClassOpen)
    }

    return (
        <div class="add-class-container">
            <div class="form-container" id="unblur">
                <h2>Create Class</h2>
                <form class="items-container" onSubmit={addClassFormSubmitHandler}>
                    <Input required placeholder="Class Name (Required)" name="className" onChange={handleChange} />
                    <Input placeholder="Subject" name="classSubject" onChange={handleChange} />
                    <Input placeholder="Description" name="classDescription" onChange={handleChange} />
                    <br />
                    <div class="btn-container">
                        <Button buttonType="styled" type="button" onClick={closingAddClassHandler}>Cancel</Button>
                        <Button buttonType="submit" type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddClass