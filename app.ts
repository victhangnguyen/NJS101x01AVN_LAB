// const http = require('http'); //! NodeRequire
import http, { IncomingMessage, ServerResponse } from 'http';
//! type RequestListener = (req: IncomingMessage, res: ServerResponse) => any
function reqListener(req: IncomingMessage, res: ServerResponse): any {
  const url = req.url;
  console.log('req.url: ', url);
  console.log('req.method: ', req.method);
  console.log('req.headers: ', req.headers);

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
