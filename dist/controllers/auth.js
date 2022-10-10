"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.getLogin = void 0;
const getLogin = (req, res, next) => {
    var _a;
    const isLoggedIn = ((_a = req.get('Cookie')) === null || _a === void 0 ? void 0 : _a.split(';')[0].trim().split('=')[1]) === 'true';
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn,
    });
};
exports.getLogin = getLogin;
const postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
};
exports.postLogin = postLogin;
//# sourceMappingURL=auth.js.map