/**
 * iniciamo el proyecto para la app de peliculas
 * version 0.0.1
 */

/**
 * instanciamos los modulos que se van a usar
 */

const express = require('express');
const app = express();


//Settings
app.set('port', process.env.PORT_PELICULAS || 3000);


// Midleware
app.use(express.json());

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin, Authorization");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
   res.header("Access-Control-Allow-Credentials", true);
   next();
});

/**
 * Aqui instanciamos las rutas
 */
app.use(require("../app/routers/Principal.router"));


/**
 * Inicializamos el servidor
 */

app.listen(app.get('port'), () =>{
   console.log(`Server running in port ${app.get('port')}`);
});
