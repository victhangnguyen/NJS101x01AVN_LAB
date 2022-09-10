//! npm i --save mysql2
import mysql from 'mysql2';

//! configuration
const connectionOption: mysql.PoolOptions = {
  //! Database Engine (Host)
  //! [prop: host : ConnectionOptions]
  host: 'localhost', //! because it's running on our local machine
  //! [prop: user : ConnectionOption]
  user: 'root',
  //! [prop: database: ConnectionOption]
  password: 'js123456',
  //! [prop: database: ConnectionOption]
  database: 'node-complete', //! name of the Schema
};

const pool: mysql.Pool = mysql.createPool(connectionOption); //! ConnectionOption

export default pool.promise(); //! because this allow us to use Promises when working with these Connections which of course handle Asynchronous.
//! Asynchronous data instead of Callback Function because Promise allow us to write Code that dont have many Nested Callback
