"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get404 = void 0;
//! exports.get404()
var get404 = function (req, res, next) {
    res.render('404', { pageTitle: 'Page Not Found', path: '' });
};
exports.get404 = get404;
//# sourceMappingURL=error.js.map