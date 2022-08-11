  // const http = require('http'); //! NodeRequire
  import http, { RequestListener, IncomingMessage, ServerResponse } from 'http';
  //! type RequestListener = (req: IncomingMessage, res: ServerResponse) => void
  function reqListener<RequestListener>(
    req: IncomingMessage,
    res: ServerResponse
  ) {
    console.log(req);
  }

  const server = http.createServer(reqListener);

  server.listen(3000);
