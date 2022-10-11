"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get404 = void 0;
//! exports.get404()
const get404 = (req, res, next) => {
    res.render('404', {
        path: '',
        pageTitle: 'Page Not Found',
        isAuthenticated: true,
    });
};
exports.get404 = get404;
//# sourceMappingURL=error.js.map