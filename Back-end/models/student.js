
const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    sId: {
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
    classes: [{
        classCode: {
            type: String,
        },
        className: {
            type: String,
        },
        classSubject:String,
        classDescription: String,
    }],
})
const Student = new mongoose.model("Student", studentSchema)
module.exports = Student
