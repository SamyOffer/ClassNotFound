const express = require('express');
const router = express.Router();

const Question = require('../models/Question.js');
const Answer = require('../models/Answer.js');
const Category = require('../models/Categories.js');
const User = require('../models/User.js');
let categories = Category.list();
let questionTarget
let answers
let categoryName



/**DISPLAY QUESTION */
router.get('/', function (req, res, next) {
    questionTarget = Question.GetFromId(req.query.questionID);
    categoryName = Category.getNameFromeId(questionTarget.category);
    answers = Answer.list_unresolved(req.query.questionID)
    good_answer_table = Answer.list_resolved(req.query.questionID)
    questionAuthor = User.authorName(questionTarget.id_member)
    res.render('question', { question: questionTarget, answersTable: answers, categories, goodAnswerstable: good_answer_table, loginVariable: req.session.login, admin: req.session.admin, id_member: req.session.id_member, questionAuthor: questionAuthor, categoryName });
});

/**ADD ANSWERS TO QUESTION */
router.post('/add_answer', function (req, res, next) {

    const answer = req.body.textArea;



    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    console.log(questionTarget.id_question)
    Answer.add({
        description: answer,
        date: datetime,
        id_member: req.session.id_member,
        good_answer: 0,
        reported: 0,
        id_question: questionTarget.id_question
    });

    questionTarget = Question.GetFromId(req.body.id_question);
    answers = Answer.list(req.body.id_question)

    res.redirect('/question?questionID=' + req.body.id_question)


});


/* go to create_question page */
router.get('/create_question', function (req, res, next) {
    if (req.session.login) {
        res.render('create_question', { categories, loginVariable: req.session.login, admin: req.session.admin });
    }
    else {
        res.redirect("/");
    }
});

/* add a question to db */
router.post('/add_question', function (req, res, next) {

    let emptyTitle = false
    let emptyDescription = false

    if (req.body.title.length == 0) {
        let emptyTitle = true
        res.render('create_question', { categories, loginVariable: req.session.login, admin: req.session.admin, emptyTitle });

    } else if (req.body.description.length == 0) {
        let emptyDescription = true
        res.render('create_question', { categories, loginVariable: req.session.login, admin: req.session.admin, emptyDescription });
    } else {
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const id_question = Question.add({ title: req.body.title, date_creation: datetime, category: req.body.category, description: req.body.description, id_member: req.session.id_member });
        res.redirect('/question?questionID=' + id_question);
    }



});

/* set an answer as correct */
router.post('/setAsCorrectAnswer', function (req, res, next) {
    Answer.setAsCorrectAnswer(req.body.answerID);
    Question.AsResolved(req.body.id_question)
    res.redirect('/question?questionID=' + req.body.id_question)
});

/* report an answer */
router.post('/reportAnswer', function (req, res, next) {
    Answer.reportAnswer(req.body.answerID);
    res.redirect('/question?questionID=' + req.body.id_question)
});

/* report a question */
router.post('/reportQuestion', function (req, res, next) {
    Question.reportQuestion(req.body.id_question);
    res.redirect('/question?questionID=' + req.body.id_question)
});



module.exports = router;