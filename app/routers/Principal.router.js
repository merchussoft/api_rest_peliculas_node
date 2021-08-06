/**
 * Aqui instanciamos las rutas principales.
 */

const express = require('express');
const router = express.Router();
const {generos } = require('../controllers/Principal.ci');

router.get('/', (req, res) =>{
    res.json({'hola': 'revisando esto'});
});

router.get('/generos', generos);


module.exports = router;
