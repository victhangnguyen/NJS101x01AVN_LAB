// const http = require('http'); //! NodeRequire
import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import Logging from './library/Logging';

//! type RequestListener = (req: IncomingMessage, res: ServerResponse) => any
function reqListener(req: IncomingMessage, res: ServerResponse): any {
  const url = req.url;
  const method = req.method;
  const headers = req.headers;

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
    return res.end(); //! reqListener renturn : any
    //! return to quit the function execution.
  }

  if (url === '/message' && method === 'POST') {
    const body: any[] = [];
    //! second arg which is that function that should be executed for every incomingData event (giống reqListener).
    //! on allow us to listen to certain events
    //! Register Event Listen for the data event whenever a new chunk is ready.
    req.on('data', (chunk) => {
      //! this listener receives a Chunk of data.
      body.push(chunk);
      Logging.info(chunk);
      //! Nodejs will execute this, so often until it's done getting all of data out of our request.
    });
    //! register Event Listener on End
    //! data     end
    //! [][][][]|[][][][]
    //!          Buffer
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      //! toString input with type=text, because the body of that request will be text => incoming data is text
      Logging.info(parsedBody); //! outputs: message=InputContent
      const message = parsedBody.split('=')[1];
      //! req.on('end', ()=>{}) is just register a function to be called in the future, it's not executed immediately
      fs.writeFileSync('message.txt', message); //! move it into the Event Listener, if this statement depends on the incoming data.
    });

    //! write some meta information
    //! 302 stands for redirection
    // res.writeHead(302, )
    res.statusCode = 302;
    //! / will automatically use the host
    res.setHeader('Location', '/');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.JS Server</h1></body>');
  res.write('</head>');
  res.end(); //! nodejs will send it back to the Client
}

const server = http.createServer(reqListener);
//! reqListenter is executed for every incomming request
//! where tell Node if X (toched server) happens, then do Y (involk this callback)

server.listen(3000);
