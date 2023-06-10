import Input from "../../../../input/input.component"
import Button from "../../../../button/button.component"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SearchForm = ({ popUpHandler }) => {
    const [classCode, setClassCode] = useState()
    const { uid } = useParams()
    const onChangeHandler = (e) => {
        setClassCode(e.target.value)
        console.log(classCode)
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await fetch(`http://localhost:3002/student/${uid}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classCode
                })
            }).then(response=>response.text())
            .then(res=>{
                if(res==="Class found"){
                    toast.success(res)
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                }
                else toast.error(res)   
            })
            // toast.success("Class Found")
           
        } catch {
            toast.error("Class code is incorrect")
        }


    }
    return (<>
        <form class="form-items-container" onSubmit={onSubmitHandler}>
            <Input placeholder="Enter the class code here" id="classCode" required name="classCode" onChange={onChangeHandler} />
            <div className="btns-container">
                <Button type="button" buttonType="styled" onClick={popUpHandler}>Cancel</Button>
                <Button type="submit" buttonType="submit" >Join</Button>
            </div>
        </form>
    </>
    )
}
export default SearchForm