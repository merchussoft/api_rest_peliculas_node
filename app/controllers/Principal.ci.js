const {obtiene_datos} = require('../systems/QueryDatabase');


exports.generos = async (req, res) => {
    let result =  await obtiene_datos({
        'table': 'genero',
        'lista_campos': ['cod_genero', 'nombre as genero'],
        'campo': 'activo',
        'valor': 1,
        'adicional': 'order by nombre asc'
    });

    res.header('content-type', 'application/json; charset=utf-8')
    res.json(result);
}
