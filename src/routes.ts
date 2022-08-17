import { IncomingMessage, ServerResponse, RequestListener } from 'http';
import fs from 'fs';
import Logging from './library/Logging';

const requestHandler = (
  req: IncomingMessage,
  res: ServerResponse
): RequestListener | any => {
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
    const body: any[] = [];

    req.on('data', (chunk) => {
      body.push(chunk);
      Logging.info(chunk);
    });
    //! register Event Listener on End
    //! data     end
    //! [][][][]|[][][][]
    //!          Buffer
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      // Logging.info(parsedBody);
      const message = parsedBody.split('=')[1];
      //! req.on('end', ()=>{}) is just register a function to be called in the future, it's not executed immediately
      fs.writeFile('message.txt', message, (error) => {
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

// module.exports = {
//   handler: requestHandler,
//   someText: 'Some hard coded text',
// };

export default {
  handler: requestHandler,
  someText: 'Some hard coded text',
};

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';
// export const handler = requestHandler;
// export const someText = 'Some hard coded text';
