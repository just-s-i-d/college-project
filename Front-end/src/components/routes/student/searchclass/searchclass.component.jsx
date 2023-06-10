import Button from "../../../button/button.component"
import Input from "../../../input/input.component"
import { UserContext } from "../../../context/usercontext.component"
import { useContext } from "react"
import "./searchclass.styles.scss"
import SearchForm from "./searchClassform/searchform.comonent"
const SearchClass = () => {
    const { setIsSearchClassOpen } = useContext(UserContext)
    const popUpHandler=()=>{
        setIsSearchClassOpen(false)
    }
    return (
        <div class="join-class-container">
            <div class="class-box-container">
                <h2>Join Class</h2>
                <SearchForm popUpHandler={popUpHandler}/>
            </div>
        </div >
    )
}
export default SearchClass