"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.getLogin = void 0;
const getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.isLoggedIn,
    });
};
exports.getLogin = getLogin;
const postLogin = (req, res, next) => {
    req.isLoggedIn = true;
    res.redirect('/');
};
exports.postLogin = postLogin;
//# sourceMappingURL=auth.js.map