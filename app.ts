  // const http = require('http'); //! NodeRequire
  import http, { IncomingMessage, ServerResponse } from 'http';
  //! type RequestListener = (req: IncomingMessage, res: ServerResponse) => void
  function reqListener(req: IncomingMessage, res: ServerResponse): void {
    //! req: contain data about request
    //! res: help you send a response
    console.log('req.url: ', req.url);
    console.log('req.method: ', req.method);
    console.log('req.headers: ', req.headers);
    // process.exit();
    res.setHeader('Content-Type', 'text/html');
    //! write some data to the Response
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.JS Server</h1></body>');
    res.write('</head>');
    //! we need to tell Node, we're done with creating that response
    res.end(); //! nodejs will send it back to the Client
  }

  const server = http.createServer(reqListener);
  //! reqListenter is executed for every incomming request
  //! where tell Node if X (toched server) happens, then do Y (involk this callback)

  server.listen(3000);
