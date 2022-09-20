//! imp library
import Logging from '../library/Logging';

import * as mongoDB from "mongodb";

const usernameMongoDB = 'njs101x';
const passwordMongoDB = 'njs101x';

const MongoClient : mongoDB.MongoClient = new mongoDB.MongoClient(`mongodb+srv://${usernameMongoDB}:${passwordMongoDB}@cluster0.nbojriq.mongodb.net/?retryWrites=true&w=majority`);

const mongoConnect = (callbackFn: (client: mongoDB.MongoClient) => void) => {
  MongoClient.connect(
    
  )
    .then((client) => {
      Logging.info('Connected!');
      callbackFn(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default mongoConnect;
