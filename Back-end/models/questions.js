const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
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
    }],
    perQuestion:Number
})
const Question = new mongoose.model("Question", questionsSchema)
module.exports = Question