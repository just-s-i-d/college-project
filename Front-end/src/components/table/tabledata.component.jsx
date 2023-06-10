const TableRow = ({sno,student,quizMarks,accType}) => {
    return (
        <tr>
            <td>{sno}</td>
            <td>{accType==="teacher"?student["displayName"]:student["quizName"]}</td>
            <td>{student&&student.marksScored}</td>
            <td>{quizMarks&&quizMarks}</td>
        </tr>
    )
}
export default TableRow