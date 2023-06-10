const mongoose = require("mongoose")
const quizSchema = new mongoose.Schema({
    tId:{
        type:String,
        required:true
    },
    classCode: {
        type: String,
        required: true
    },
    displayName:String,
    quizes: [
        {
            quizCode: String,
            quizName: String,
            quizTopic:String,
            quizMarks:Number,
            quizTime: Number,
            quizTotalQuestions:Number,
            perQuestion:Number
        }
    ]
})

const Quiz = new mongoose.model("Quiz", quizSchema)
module.exports = Quiz