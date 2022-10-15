"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = exports.postSignup = exports.postLogin = exports.getSignup = exports.getLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//! imp models
const user_1 = __importDefault(require("../models/user"));
const getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: req.flash('error'),
    });
};
exports.getLogin = getLogin;
//@ /signup => GET
const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
    });
};
exports.getSignup = getSignup;
//@ /login => POST
const postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    user_1.default.findOne({ email: email })
        .then((user) => {
        if (!user) {
            //! throw Error : No existing email or username with connect-flash
            req.flash('error', 'Invalid email or password!');
            return res.redirect('/login');
        }
        //! If the email exists, then validate the password
        bcryptjs_1.default
            .compare(password, user.password)
            .then((doMatch) => {
            if (doMatch) {
                //! if true
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save((err) => {
                    console.log(' req.session.save[err] :', err);
                    res.redirect('/');
                });
            }
            res.redirect('/login');
        })
            .catch((err) => {
            console.log(err);
            res.redirect('/login');
        });
    })
        .catch((err) => console.log(err));
};
exports.postLogin = postLogin;
//@ /signup => POST
const postSignup = (req, res, next) => {
    //! create a new User
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    //! find out if a user with that email exists
    user_1.default.findOne({ email: email })
        .then((userDoc) => {
        if (userDoc) {
            return res.redirect('/signup');
        }
        //! currenty a value of 12 is accepted as hightly secure, this function is an asynchronous
        return bcryptjs_1.default
            .hash(password, 12)
            .then((hashedPassword) => {
            const user = new user_1.default({
                email: email,
                password: hashedPassword,
                cart: { items: [] },
            });
            return user.save();
        })
            .then((result) => {
            //! success action then redirect to login
            res.redirect('/login');
        });
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.postSignup = postSignup;
//@ /logout => POST
const postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};
exports.postLogout = postLogout;
//# sourceMappingURL=auth.js.map