/**
 * Aqui instanciamos las rutas principales.
 */

const express = require('express');
const router = express.Router();
const {generos, list_ssh_files, guardarArchivos, vistaFormulario, ListarPeliculas, ViewFiles} = require('../controllers/Principal.ci');
const return_multer = require('../systems/FileProcess');


router.get('/', ListarPeliculas);

router.get('/generos', generos);

router.get('/list_ssh', list_ssh_files);

router.get('/page_file', vistaFormulario );

router.post('/upload',  return_multer.fields([{'name': 'image'}, {'name': 'video'}]), guardarArchivos);

router.get('/verFile/:id',  ViewFiles);



module.exports = router;
