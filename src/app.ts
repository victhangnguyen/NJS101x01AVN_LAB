import http from 'http';
import Logging from './library/Logging';
import express, { Request, Response, NextFunction } from 'express';

//! an instance of the app object
const app = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('In the middleware 1!');
  next(); //! This allows the Request to continue to the Next Middleware in line (funnel)
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('In the middleware 2!');
  //! (property) Response<any, Record<string, any>, number>.send: (body?: any) => express.Response<any, Record<string, any>>
  res.send(`<h1>Hello from Express</h1>`);
});

const server = http.createServer(app);

server.listen(3000);
