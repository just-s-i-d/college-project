const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    tId: {
        type: String,
        required: true
    },
    classCode: {
        type: String,
        required: true
    },
    className:{
        type: String,
        required: true
    },
    displayName:String,
    classSubject:String,
    classDescription:String,
    quizzes:[{quizCode:String}]
})

const Class=new mongoose.model("Class",classSchema)
module.exports=Class