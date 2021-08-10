/**
 * archivos de configuracion para la base de datos
 */

// const mysql = require('mysql');
//
//
// const conex = mysql.createConnection({
//    host: '168.61.208.82',
//    user: 'root',
//    password: 'Cuervo2019',
//    database: 'peliculas',
//    port: 2250
// });
//
// conex.connect((error)=>{
//    if(error) throw error;
// });
//
// module.exports = conex;


const mysql2 = require('mysql2');
const {promisify} = require('util');

const conexion = mysql2.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   port: process.env.DB_PORT
});

conexion.getConnection((error, connection) => {
   if (error) {
      switch (error.code) {
         case 'PROTOCOL_CONNECTION_LOST':
            console.log("DATABASE CONNECTION WAS CLOSED.");
            break;
         case 'ER_CON_COUNT_ERROR':
            console.log("DATABASE HAS TO MANY CONNECTIONS.");
            break;
         case 'ECONNREFUSED':
            console.log("DATABASE CONNECTION WAS REFUSED.");
            break;
         case 'ER_ACCESS_DENIED_ERROR':
            console.log("DATABASE ACCESS DENIED ERROR.");
            break;
      }
   }

   if (connection) {
      connection.release();
   }
   return connection;
});

// conexion.query = promisify(conexion.query);
const promisePool = conexion.promise();

module.exports = promisePool;
// module.exports = conexion;

