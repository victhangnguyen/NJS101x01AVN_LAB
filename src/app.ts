  import http from 'http';
  import Logging from './library/Logging';
  import express, { Request, Response, NextFunction } from 'express';

  //! an instance of the app object
  const app = express();
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('In the middleware 1!');
    next(); //! This allows the Request to continue to the Next Middleware in line (funnel)
  });
  //! use allow us to add a new Middleware function, it accespt an array of so-called RequestHandler
  //! function will be executed for every Icomming Request
  //! next allow request to travel on to the next middleware

  //! localhost:3000, the browser keep on spinning => we dont get a Response
  //! this allow us to HOOK into this funnel through which the Request is sent.

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('In the middleware 2!');
  });

  const server = http.createServer(app);

  server.listen(3000);
