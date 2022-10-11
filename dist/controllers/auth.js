"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.getLogin = void 0;
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
const postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
};
exports.postLogin = postLogin;
//# sourceMappingURL=auth.js.map