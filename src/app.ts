// const http = require('http'); //! NodeRequire
import http from 'http';
import Logging from './library/Logging';

//! imp Routes
// const routes = require('./routes');
  import routes from './routes';

//! type RequestListener = (req: IncomingMessage, res: ServerResponse) => any
const server = http.createServer(routes.handler);
Logging.info(routes.someText);

server.listen(3000);
