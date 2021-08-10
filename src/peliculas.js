/**
 * iniciamo el proyecto para la app de peliculas
 * version 0.0.1
 */

/**
 * instanciamos los modulos que se van a usar
 */

const express = require('express');
const app = express();
const path = require('path')
const morgan = require('morgan');
// const multer = require('multer');


//Settings
app.set('port', process.env.PORT_PELICULAS || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// instancia para leer los .env
require('dotenv').config();


// Midleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// const storage_multer = multer.diskStorage({
//    destination: path.join(__dirname, 'public/uploads'),
//    filename: (req, file, cb) =>{
//       cb(null, file.originalname)
//    }
// })

// app.use(multer({storage: storage_multer}).fields([{'name': 'image'}, {'name': 'video'}]));

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
   console.log(`Server running in ports ${app.get('port')}`);
});
