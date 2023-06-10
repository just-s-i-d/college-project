const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
    sId: {
        type: String,
        required: true
    },
    classCode: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    quizCode: {
        type: String,
        required: true
    },
    questionAnswer: [
        {
            questionNo: Number,
            answer: String,
            correct: Boolean,
        }
    ],
    marksScored: Number
})

const Studentanswer = new mongoose.model("Studentanswer", answersSchema)
module.exports = Studentanswer