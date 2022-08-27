"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
//! an instance of the app object
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log('In the middleware 1!');
    next(); //! This allows the Request to continue to the Next Middleware in line (funnel)
});
app.use((req, res, next) => {
    console.log('In the middleware 2!');
    //! (property) Response<any, Record<string, any>, number>.send: (body?: any) => express.Response<any, Record<string, any>>
    res.send(`<h1>Hello from Express</h1>`);
});
const server = http_1.default.createServer(app);
server.listen(3000);
//# sourceMappingURL=app.js.map