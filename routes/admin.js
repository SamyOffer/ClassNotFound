const express = require('express');
const router = express.Router();

// TODO create your controllers

const Question = require('../models/Question.js');
const Answer = require('../models/Answer.js');
let reportedQuestionslist = Question.reportedList;
let reportedAnswerslist = Answer.reportedList;
let QuestionTable = Question.first20list();

/* render the admin page */
router.get('/', function (req, res, next) {
    if (req.session.admin) {
        res.render('admin', { reportedQuestionslist, reportedAnswerslist, loginVariable: req.session.login, admin: req.session.admin });

    }
    res.redirect('/');
});

router.post('/banQuestion', function (req, res, next) {

    Answer.removeAllAnswersFromAQuestion(req.body.questionID)
    Question.remove(req.body.questionID)

    res.render('admin', { reportedQuestionslist, reportedAnswerslist, loginVariable: req.session.login, admin: req.session.admin });
});

router.post('/acceptQuestion', function (req, res, next) {

    Question.unreport(req.body.questionID)

    res.render('admin', { reportedQuestionslist, reportedAnswerslist, loginVariable: req.session.login, admin: req.session.admin });
});

router.post('/banAnswer', function (req, res, next) {

    Answer.remove(req.body.answerID)

    res.render('admin', { reportedQuestionslist, reportedAnswerslist, loginVariable: req.session.login, admin: req.session.admin });
});

router.post('/acceptAnswer', function (req, res, next) {

    Answer.unreport(req.body.answerID)

    res.render('admin', { reportedQuestionslist, reportedAnswerslist, loginVariable: req.session.login, admin: req.session.admin });
});

module.exports = router;