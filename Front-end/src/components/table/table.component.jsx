import { useContext, useEffect, useState } from "react"
import "./table.styles.scss"
import { ResultContext } from "../context/result.component"
import TableRow from "./tabledata.component"
const Table = ({accType}) => {
    const { result } = useContext(ResultContext)
    let count = 0
    return (
        <div className="table-container">
            <table id="resultTable">
                <tr>
                    <th>S.no</th>
                    <th>{accType==="teacher"?"Name of Student":"Quiz Name"}</th>
                    <th>Obtained Marks</th>
                    <th>Total Marks</th>
                </tr>
                {console.log(accType)}
                {result && result.map(s => {
                    count = count + 1
                    return <TableRow sno={count} student={s} quizMarks={s.quizMarks} accType={accType}/>
                })}
            </table>
        </div>
    )
}
export default Table