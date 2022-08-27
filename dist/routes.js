"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Logging_1 = __importDefault(require("./library/Logging"));
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write(`
          <body>
            <form action="/message" method="POST" novalidate>
              <input type="text" name="message">
              <button type="submit">Send</button>
            </form>
          </body>
        `);
        res.write('</head>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            Logging_1.default.info(chunk);
        });
        //! register Event Listener on End
        //! data     end
        //! [][][][]|[][][][]
        //!          Buffer
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //! req.on('end', ()=>{}) is just register a function to be called in the future, it's not executed immediately
            fs_1.default.writeFile('message.txt', message, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.JS Server</h1></body>');
    res.write('</head>');
    res.end();
};
//! module.exports = requestHandler; //! exposed globally by NodeJS
exports.default = {
    handler: requestHandler,
    someText: 'Some hard coded text',
};
//# sourceMappingURL=routes.js.map