
import ClassBox from "./classbox/classbox.component"
import "./maincontent.styles.scss"

const MainContent = ({ data }) => {
    return (
        <div className="main-container">
            <div className="main-content">
                <div className="main-content-container">
                    {data && data.map((d) => <ClassBox clas={d} />)}
                </div>
            </div>
        </div>
    )
}
export default MainContent