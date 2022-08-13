// const http = require('http'); //! NodeRequire
import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';

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
    fs.writeFileSync('message.txt', 'Message Content');
    //! write some meta information
    //! 302 stands for redirection
    // res.writeHead(302, )
    res.statusCode = 302;
    //! / will automatically use the host
    res.setHeader('Location', '/alo');
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
