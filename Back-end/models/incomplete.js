const mongoose = require("mongoose");

const incompleteSchema = new mongoose.Schema({
    tId: {
        type: String,
        required: true
    },
    classCode: {
        type: String,
        required: true
    },
    quizCode: {
        type: String,
        required: true
    },
    questions: [{
        questionNo: Number,
        question: String,
        optionA: String,
        optionB: String,
        optionC: String,
        optionD: String,
        answer: String
    }]
})
const Incomplete = new mongoose.model("Incomplete", incompleteSchema)
module.exports = Incomplete