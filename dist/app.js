"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const Logging_1 = __importDefault(require("./library/Logging"));
//! imp Routes
// const routes = require('./routes');
const routes_1 = __importDefault(require("./routes"));
//! type RequestListener = (req: IncomingMessage, res: ServerResponse) => any
const server = http_1.default.createServer(routes_1.default.handler);
Logging_1.default.info(routes_1.default.someText);
server.listen(3000);
//# sourceMappingURL=app.js.map