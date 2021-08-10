const {obtiene_datos2, insertDatos} = require('../systems/QueryDatabase');
// const {listFiles} = require ('../systems/SshProcess');
const {ListaPeliculas} = require('../models/PrincipalModel');



exports.ListarPeliculas = async (req, res) =>{
    res.json(await ListaPeliculas());
}

exports.generos = async (req, res) => {
    res.header('content-type', 'application/json; charset=utf-8')
    res.json(await cargarGeneros());
}

exports.list_ssh_files = async (req, res) => {
    // console.log(await listFiles());

    // res.json(await listFiles())
}

exports.vistaFormulario = async (req, res) => {
    let result = await cargarGeneros()
    res.render('FileUpload', {'generos': result});
}

exports.guardarArchivos = async (req, res) => {
    let data_insert = {}
    let return_data = {'mensaje': 'Error al agregar la pelicula', 'code': 500}
    let data_form = req.body;
    data_insert.nombre = data_form.titulo;
    data_insert.sinopsis = data_form.sinopsis;
    data_insert.cod_genero = data_form.genero;
    let pelicula = await insertDatos('list_peliculas', data_insert)
    if (pelicula) {
        data_insert = {}
        let data_video = req.files.video[0];
        data_insert.nombre_archivo = data_video.originalname;
        data_insert.content_type = data_video.mimetype;
        data_insert.tamano = data_video.size;
        data_insert.descripcion = data_video.fieldname;
        data_insert.ubicacion = data_video.destination;
        let video = await insertDatos('archivos_adjuntos', data_insert);
        if (video) {
            let data_imagen = req.files.image[0];
            data_insert.nombre_archivo = data_imagen.originalname;
            data_insert.content_type = data_imagen.mimetype;
            data_insert.tamano = data_imagen.size;
            data_insert.descripcion = data_imagen.fieldname;
            data_insert.ubicacion = data_imagen.destination;
            let imagen = await insertDatos('archivos_adjuntos', data_insert);
            if (imagen) {
                data_insert = {}
                data_insert.cod_list_peliculas = pelicula;
                data_insert.cod_archivos_adjuntos = video;
                video = await insertDatos('relacion_pelicula', data_insert)
                data_insert.cod_archivos_adjuntos = imagen;
                imagen = await insertDatos('relacion_pelicula', data_insert)
                if (video && imagen) {
                    return_data = {'mensaje': 'Pelicula agregada exitosamente', 'code': 200}
                }
            }
        }
    }
    res.status(return_data.code)
    if (return_data.code === 200) {
        res.redirect('/page_file')
    } else {
        res.json(return_data);
    }
}

async function cargarGeneros() {
    let [result] = await obtiene_datos2({
        'table': 'genero',
        'lista_campos': ['cod_genero', 'nombre as genero'],
        'campo': 'activo',
        'valor': 1,
        'adicional': 'order by nombre asc'
    });
    return result;
}

exports.ViewFiles = async (req, res) =>{
    const [archivo] = await obtiene_datos2({
        'table': 'archivos_adjuntos',
        'lista_campos': ['nombre_archivo', 'ubicacion'],
        'campo': 'cod_archivos_adjuntos',
        'valor': req.params.id
    })
    let archivos = archivo[0]
    res.sendFile( archivos.nombre_archivo, {root: `${archivos.ubicacion}`}, function(err){
        console.log(err)
    });
}
