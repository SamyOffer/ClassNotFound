const express = require('express');
const router = express.Router();


const Question = require('../models/Question.js');
const Category = require('../models/Categories.js');
let categories = Category.list();
let QuestionTable = Question.first20list();

router.get('/', function (req, res, next) {
    QuestionTable = Question.first20list();
    console.log(req.session);
    res.render('index', { table: QuestionTable, categories, loginVariable: req.session.login, admin: req.session.admin });
});

router.get('/categoryFiltre', function (req, res, next) {
    QuestionTable = Question.listWithCategory(req.query.categoryID)
    res.render('index', { table: QuestionTable, categories, loginVariable: req.session.login, admin: req.session.admin });
});

router.get('/search', function (req, res, next) {
    QuestionTable = Question.listWithTitle(req.query.nameSearch)
    res.render('index', { table: QuestionTable, categories, loginVariable: req.session.login, admin: req.session.admin });
});

module.exports = router;