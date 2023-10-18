const express = require('express');
const { readonly } = require('../models/db_conf');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User.js');
const Question = require('../models/Question.js')
const Answer = require('../models/Answer.js')
const table = Question.first20list;


router.get('/', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/');
    }
    res.render('users/index', { loginVariable: req.session.login, admin: req.session.admin });
});


/* register page  */
router.get('/register', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/');
    }
    res.render('users/register', { loginVariable: req.session.login, admin: req.session.admin });
});


/**Register the member */
router.post('/add', function (req, res, next) {
    const mail_accepted1 = req.body.firstname.toLowerCase() + "." + req.body.lastname.toLowerCase() + '@student.vinci.be';
    const mail_accepted2 = req.body.firstname.toLowerCase() + "." + req.body.lastname.toLowerCase() + '@vinci.be';

    if ((req.body.email === mail_accepted1) || (req.body.email === mail_accepted2)) {
        console.log("Test id received 1")

        const passwordCrypted = bcrypt.hashSync(req.body.password, saltRounds);
        if (User.searchEmail(req.body.email) === undefined) {
            console.log("Test id received 3")
            console.log(req.body.email)
            User.add({
                last_name: req.body.lastname,
                first_name: req.body.firstname,
                password: passwordCrypted,
                email: req.body.email
            })
            req.session.login = true;
            req.session.admin = false;
            req.session.id_member = User.find(req.body.email).id_member;
            res.render('index', { loginVariable: req.session.login, table, admin: req.session.admin })
        }
        else {
            console.log("Test id received 2, WRONG PASSWORD")
            console.log(User.searchEmail(req.body.email));

            res.render('users/register', { errorRegisterIndatabase: true })
        }
    }
    /**Return to register page because mail not valid */
    else {
        console.log("mail not valid ")
        res.render('users/register', { errorRegisterMailIncorrect: true })
    }



});

//* member login */
router.post('/login', (req, res, next) => {


    const email = req.body.memberLogin;
    const dbUser = User.find(email);

    console.log("USERS LOGIN");
    /**Verification if mail is in the databae  */
    console.log(User.searchEmail(req.body.memberLogin))
    if (User.searchEmail(req.body.memberLogin) === undefined) {
        console.log("Mail not in database");
        res.render('users/index', { errorLoginMail: true })
    }
    else {
        /**Verification if password is correct */
        console.log(req.body.memberPassword)
        if (bcrypt.compareSync(req.body.memberPassword, dbUser.password)) {

            console.log("Le mot de passe est juste ")
            //session variable
            req.session.admin = false;
            req.session.login = true;
            req.session.id_member = dbUser.id_member;
            if (dbUser.admin === 1) {
                req.session.admin = true;
            }
            res.render('index', { loginVariable: req.session.login, table, admin: req.session.admin })
        }
        else {
            console.log("Error password is incorrect")
            res.render('users/index', { errorLoginPassword: true })
        }
    }

});


/* Log out  */
router.get('/logout', function (req, res, next) {
    console.log(req.session);
    req.session.destroy();
    res.redirect('/')
});


/* member page  */
router.get('/member_page', function (req, res, next) {
    if (!req.session.login) {
        res.redirect('/');
    }

    let openQuestionslist = Question.openQuestionsOfAMember(req.session.id_member)
    let resolvedQuestionslist = Question.resolvedQuestionsOfAMember(req.session.id_member)
    res.render('users/members', { openQuestionslist, resolvedQuestionslist, loginVariable: req.session.login, admin: req.session.admin });
});


/* admin page  */
router.get('/admin', function (req, res, next) {
    reportedQuestionslist = Question.reportedList();
    reportedAnswerslist = Answer.reportedList();
    res.render('admin', { reportedQuestionslist, reportedAnswerslist, loginVariable: req.session.login, admin: req.session.admin });
});

module.exports = router;