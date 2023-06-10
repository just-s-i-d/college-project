
const mongoose = require("mongoose")
const teacherSchema = new mongoose.Schema({
    tId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    classes: [{ classCode: String }],
}
)

const Teacher = new mongoose.model("Teacher", teacherSchema)
module.exports = Teacher
