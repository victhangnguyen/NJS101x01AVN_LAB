import http from 'http';
import Logging from './library/Logging';
import express from 'express';

//! an instance of the app object
const app = express();
//! type RequestListener = (req: IncomingMessage, res: ServerResponse) => any
const server = http.createServer();

server.listen(3000);
