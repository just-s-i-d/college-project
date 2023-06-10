const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const Teacher = require("./models/teacher")
const Student = require("./models/student")
const Quiz = require("./models/quiz")
const Question = require("./models/questions")
const Studentanswer = require("./models/studentanswers")
const Class = require("./models/classes")
const CORS = require("cors")
const Incomplete = require("./models/incomplete")

function Codegenerator() {
    return Math.random().toString(36).substr(2, 5);
}
// const _method = require("method-override")
mongoose.connect("mongodb+srv://just-s-i-d:TtRfHNy6L5mv9TWT@quiz.hguxum5.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connection Succeefull")
    }).catch(e => console.log(e))
// mongoose.connect("mongodb+srv://just-s-i-d:kpWEcVapvmpGzD3z@quiz.hguxum5.mongodb.net/?retryWrites=true&w=majority/Quiz",
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => {
//         console.log("Connection Succeefull")
//     }).catch(e => console.log(e))


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
// app.use(_method)

//requests for teacher pages
app.use(express.json())
app.use(CORS())

app.post("/register", async (req, res) => {
    const { email, displayName, accType, uid } = req.body
    try {
        if (accType === "teacher") {
            const newTeacher = new Teacher({ email, displayName, tId: uid })
            await newTeacher.save()
            res.send(" teacher Account created succeesfully")
        } else if (accType === "student") {
            const newStudent = new Student({ email, displayName, sId: uid })
            await newStudent.save()
            res.send("student Account created succeesfully")
        }
    }
    catch {
        res.send("Something went wrong")
    }

})


app.get("/teacher/:uid", async (req, res) => {
    const { uid } = req.params
    const classes = await Class.find({ tId: uid })
    console.log(classes)
    res.send(classes)
})
app.post("/teacher/:uid", async (req, res) => {
    const { className, classSubject, classDescription } = req.body
    const { uid } = req.params

    const classCode = Codegenerator()
    try {
        await Teacher.updateOne({ tId: uid }, { $push: { classes: { classCode } } })
        const t = await Teacher.findOne({ tId: uid })
        const { displayName } = t
        const newClass = new Class({ tId: uid, displayName, className, classSubject, classCode, classDescription })
        const newQuiz = new Quiz({ tId: uid, displayName, classCode })
        await newQuiz.save()
        await newClass.save()
        res.send("Class created")
    } catch (e) {
        res.send("Server Error")
    }
})

app.get("/teacher/:uid/:classCode", async (req, res) => {
    const { uid, classCode } = req.params
    const allQuizes = await Quiz.findOne({ tId: uid, classCode })
    res.send(allQuizes)
})

app.post("/teacher/:uid/:classCode", async (req, res) => {
    const { classCode, uid } = req.params
    const { quizName, quizTopic, quizMarks, quizTime, quizTotalQuestions } = req.body
    const perQuestion = Math.floor((quizMarks / quizTotalQuestions) * 100) / 100
    const quizCode = Codegenerator()
    try {
        await Quiz.updateOne({ tId: uid, classCode }, { $push: { quizes: { quizCode, quizName, quizTopic, quizMarks, quizTime, quizTotalQuestions, perQuestion } } })
        await Class.updateOne({ tId: uid, classCode }, { $push: { quizzes: { quizCode } } })
        const newPaper = new Question({ tId: uid, classCode, quizCode, perQuestion })
        const newRecord = new Incomplete({ tId: uid, classCode, quizCode })
        await newPaper.save()
        await newRecord.save()
        res.send("Quiz added")
    } catch (e) {
        res.send("Server Error")
    }
})

app.post("/teacher/:uid/:classCode/:quizCode/:questionNo", async (req, res) => {
    const { classCode, uid, quizCode, questionNo } = req.params
    const { question, optionA, optionB, optionC, optionD, answer } = req.body
    try {
        await Incomplete.updateOne({ tId: uid, classCode, quizCode }, { $push: { questions: { questionNo, question, optionA, optionB, optionC, optionD, answer } } })
        res.send("Question Saved")
    } catch (e) {
        res.send("Server Error")
    }
})

app.get("/teacher/:uid/:classCode/:quizCode", async (req, res) => {
    const { uid, classCode, quizCode } = req.params
    try {
        const allQuestions = await Incomplete.findOne({ tId: uid, classCode, quizCode }, { _id: 0, questions: 1 })
        const { questions } = allQuestions
        const newData = await Question.updateOne({ tId: uid, classCode, quizCode }, { $push: { questions } })
        res.send("Quiz Created Succesfully")
        console.log("quiz created")
    }
    catch {
        res.send("Server Error")
    }
})
app.post("/teacher/:uid/:classCode/:quizCode", async (req, res) => {
    const { uid, classCode, quizCode } = req.params
    if (quizCode) {
        const response = await Quiz.findOne({ tId: uid, classCode, quizes: { $elemMatch: { quizCode } } }, { _id: 0, quizes: 1 })
        if (response) {
            const { quizes } = response
            res.send(quizes)
        }
    }
})


app.get("/student/:uid", async (req, res) => {
    const { uid } = req.params
    const response = await Student.findOne({ sId: uid })
    if(response){
        const {classes}=response
        res.send(classes)
    }
   
})
app.post("/student/:uid", async (req, res) => {
    const { uid } = req.params
    console.log(uid)
    const { classCode } = req.body
    const foundData = await Class.findOne({ classCode })
    if (foundData) {
        const foundClass = await Student.findOne({ sId: uid, classes: { $elemMatch: { classCode } } }, { _id: 0, "classes.$": 1 })
        console.log(foundClass)
        if (foundClass) {
            res.send("Class already present")
        }
        else {
            const { className, classSubject, classDescription } = foundData
            console.log(await Student.findOne({ sId: uid }))
            const response = await Student.updateOne({ sId: uid }, { $push: { classes: { classCode, className, classSubject, classDescription } } })
            res.send("Class found")
        }
    }
    else {
        res.send("class not found")
    }
})

app.get("/student/:uid/:classCode", async (req, res) => {
    const { uid, classCode } = req.params
    // const StudentDetails = await Student.findOne({ sId: uid }, { displayName: 1 })
    // const { displayName } = StudentDetails
    const allQuizes = await Quiz.findOne({ classCode })
    res.send(allQuizes)
})

app.get("/student/:uid/:classCode/:quizCode", async (req, res) => {
    const { classCode, quizCode } = req.params
    const foundQuestions = await Quiz.findOne({ classCode, quizes: { $elemMatch: { quizCode } } }, { _id: 0, "quizes.$": 1 })
    if (foundQuestions) {
        const { quizes } = foundQuestions
        console.log(quizes[0])
        res.send(quizes[0])
    }
}
)

app.get("/student/:uid/:classCode/:quizCode/:questionNo", async (req, res) => {
    const { uid, classCode, quizCode, questionNo } = req.params
    const foundQuestions = await Question.findOne({ classCode, quizCode, questions: { $elemMatch: { questionNo } } }, { "questions.$": 1, _id: 0 })
    if (foundQuestions) {
        const { questions } = foundQuestions
        res.send(questions[0])
    } else {
        res.send("Finished")
    }
})

app.post("/student/:uid/:classCode/:quizCode/:questionNo", async (req, res) => {
    const { uid, classCode, quizCode, questionNo } = req.params
    const { answer } = req.body
    const foundRecord = await Studentanswer.findOne({ sId: uid, classCode, quizCode })
    try {
        if (foundRecord) {
            // const foundQuestion = await Studentanswer.findOne({ sId: uid, classCode, quizCode, questionAnswer: { $elemMatch: { questionNo } } }, { "questionAnswer.$": 1, _id: 0 })
            const foundQuestion = await Studentanswer.findOne({ sId: uid, classCode, quizCode, "questionAnswer.questionNo": questionNo }, { "questionAnswer.$": 1, _id: 0 })
            console.log(foundQuestion)
            if (foundQuestion) {
                await Studentanswer.findOneAndUpdate({ sId: uid, classCode, quizCode, "questionAnswer.questionNo": questionNo }, { $set: { "questionAnswer.$.answer": answer } })
            }
            else {
                await Studentanswer.updateOne({ sId: uid, classCode, quizCode }, { $push: { questionAnswer: { questionNo, answer } } })
            }
        }
        else {
            const { displayName } = await Student.findOne({ sId: uid }, { _id: 0, displayName: 1 })
            const newStudentAnswers = new Studentanswer({ sId: uid, classCode, quizCode, displayName })
            await newStudentAnswers.save()    // await Studentanswer.findOne({sId: uid, classCode, quizCode},{$push:{questionNo,answer}})
            await Studentanswer.updateOne({ sId: uid, classCode, quizCode }, { $push: { questionAnswer: { questionNo, answer } } })
        }
        res.send("Answer Recorded")
    } catch {
        res.send("Server Error")
    }

})

app.post("/student", async (req, res) => {
    const { uid, classCode, quizCode } = req.body
    const { perQuestion, questions } = await Question.findOne({ classCode, quizCode }, { _id: 0, perQuestion: 1, questions: { questionNo: 1, answer: 1 } })
    let { questionAnswer } = await Studentanswer.findOne({ sId: uid, classCode, quizCode }, { _id: 0, questionAnswer: 1 })
    for (const student of questionAnswer) {
        const { questionNo, answer } = student
        for (const question of questions) {

            if (questionNo === question.questionNo) {
                if (answer === question.answer) {
                    await Studentanswer.updateOne({ sId: uid, classCode, quizCode, "questionAnswer.questionNo": questionNo }, { $set: { "questionAnswer.$.correct": true } })
                    break
                }
                else {
                    await Studentanswer.updateOne({ sId: uid, classCode, quizCode, "questionAnswer.questionNo": questionNo }, { $set: { "questionAnswer.$.correct": false } })
                    break
                }
            }
            else {
                continue
            }
        }
    }
    const response = await Studentanswer.findOne({ sId: uid, classCode, quizCode }, { _id: 0, questionAnswer: 1 })
    const studentanswers=response.questionAnswer
    console.log(studentanswers)
    let marksScored = 0
    for (let student of studentanswers) {
        let{ correct } = student
        console.log(correct)
        if (correct === true) {
            marksScored = marksScored + perQuestion
        }
    }
    const result = await Studentanswer.updateOne({ sId: uid, classCode, quizCode }, { $set: { marksScored } })
    res.send(result)
}
)

app.post("/showresult", async (req, res) => {
    const { selectedClass } = req.body
    console.log(selectedClass)
    if (selectedClass) {
        const { quizes } = await Quiz.findOne({ classCode: selectedClass }, { _id: 0, quizes: 1 })
        res.send(quizes)
    }
})
app.post("/getresult", async (req, res) => {
    const { selectedClass, selectedQuiz } = req.body
    const student = await Studentanswer.find({ classCode: selectedClass, quizCode: selectedQuiz })
    const quiz = await Quiz.findOne({ classCode: selectedClass, quizes: { $elemMatch: { quizCode: selectedQuiz } } }, { _id: 0, "quizes.$": 1 })
    console.log(student)
    const Results = []
    if (quiz) {
        const { quizes } = quiz
        const { quizMarks } = quizes[0]
        for (let i = 0; i < student.length; i++) {
            const { displayName, marksScored } = student[i]
            const resultObj = {
                displayName,
                quizMarks,
                marksScored
            };
            Results.push(resultObj);
        }
        res.send(Results)
    }
})
app.post("/studentgetresult", async (req, res) => {
    console.log("here")
    const { uid, selectedClass } = req.body
    const studentResult = await Studentanswer.find({ sId: uid, classCode: selectedClass }, { _id: 0, quizCode: 1, marksScored: 1 })
    const Results = []
    for (let i = 0; i < studentResult.length; i++) {
        const { marksScored, quizCode } = studentResult[i];
        const response = await Quiz.findOne({ classCode: selectedClass, quizes: { $elemMatch: { quizCode } } }, { _id: 0, "quizes.$": 1 });
        const quizName = response.quizes[0]["quizName"];
        const quizMarks = response.quizes[0]["quizMarks"];
        const resultObj = {
            quizName,
            quizMarks,
            marksScored
        };

        Results.push(resultObj);
    }
    console.log(Results)
    res.send(Results)
})


app.post("/student/:uid/:classCode", async (req, res) => {
    const { uid, classCode } = req.params
    const { quizCode } = req.body
    const attemptedQuiz = await Studentanswer.findOne({ sId: uid, classCode, quizCode }, { _id: 0, questionAnswer: 1 })
    console.log(attemptedQuiz)
    if (attemptedQuiz == null) {
        res.send({ message: "no data" })
    }
    else {
        res.send({ message: "data present" })
    }
})
// app.get("/teacher/classes", async (req, res) => {
//     const allClasses = await Class.find()
//     // const count=allClasses.length()
//     // console.log(count)

// })

// app.post("/teacher/classes", async (req, res) => {
//     const { cname, csub, cdes } = req.body
//     const classCode = Codegenerator()
//     const newClass = new Class({ classCode, cname, csub, cdes })
//     await newClass.save()
//     res.redirect("/teacher/classes")
// })

// app.post("/teacher/:ccode", async (req, res) => {
//     const { ccode } = req.params
//     const qCode = Codegenerator()
//     const { qName, qSub, qQues, qMarks, qTime } = req.body
//     const newQuiz = new Quiz({ ccode, qCode, qName, qSub, qQues, qMarks, qTime })
//     await newQuiz.save()
//     res.redirect(`${ccode}`)
// })
// app.get("/teacher/:ccode/:qCode", async (req, res) => {
//     const { ccode, qCode } = req.params
//     const foundQuiz = await Quiz.findOne({ qCode })
//     res.render("teacher/quizQuestions", { foundQuiz })
// })
// //request for student page
// app.get("/student/classes", async (req, res) => {
//     const allClasses = await StudentClass.find()

//     res.render("student/studentHome", { allClasses })
// })
// app.get("/student/:ccode", async (req, res) => {
//     const { ccode } = req.params
//     const allQuizes = await Quiz.find({ ccode })
//     res.render("student/studentQuizes", { allQuizes })
// })

// app.post("/student/classes", async (req, res) => {
//     const { classCode } = req.body
//     const FoundClass = await Class.findOne({ classCode })
//     if (FoundClass) {
//         let { classCode, cname, csub } = FoundClass
//         const newStudentClass = new StudentClass({ classCode, cname, csub })
//         await newStudentClass.save()
//         res.redirect("/student/classes")
//     } else {
//         console.log("Cannot Find Class")
//     }
// })



app.listen(3002, () => {
    console.log("listening on port 3002")
})





