"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = exports.postSignup = exports.postLogin = exports.getSignup = exports.getLogin = void 0;
const app_1 = require("../app");
//! imp models
const user_1 = __importDefault(require("../models/user"));
const getLogin = (req, res, next) => {
    // const isLoggedIn =
    //   req.get('Cookie')?.split(';')[0].trim().split('=')[1] === 'true';
    console.log('__Debugger__ctrls__auth__getLogin__req.session.isLoggedIn: ', req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
    });
};
exports.getLogin = getLogin;
//@ /signup => GET
const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
    });
};
exports.getSignup = getSignup;
//@ /login => POST
const postLogin = (req, res, next) => {
    user_1.default.findById(app_1.CURRENT_USER_ID)
        .then((user) => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
            console.log(' req.session.save[err] :', err);
            res.redirect('/');
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
            return res.redirect('/');
        }
        const user = new user_1.default({
            email: email,
            password: password,
            cart: { items: [] },
        });
        return user.save();
    })
        .then((result) => {
        //! success action then redirect to login
        res.redirect('/login');
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