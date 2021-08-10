const {query_simple2} = require('../systems/QueryDatabase');

exports.ListaPeliculas = async () => {
    let sql = 'SELECT lp.nombre as pelicula, lp.sinopsis, g.nombre as genero, aa.cod_archivos_adjuntos as archivo, '
        + ' (SELECT rps.cod_archivos_adjuntos FROM relacion_pelicula rps INNER JOIN archivos_adjuntos aas ON aas.cod_archivos_adjuntos = rps.cod_archivos_adjuntos WHERE aas.descripcion = "video" and rps.cod_list_peliculas = lp.cod_list_peliculas) as videos '
        + ' FROM list_peliculas lp '
        + ' INNER JOIN genero g ON g.cod_genero = lp.cod_genero '
        + ' INNER JOIN relacion_pelicula rp ON rp.cod_list_peliculas = lp.cod_list_peliculas '
        + ' INNER JOIN archivos_adjuntos aa ON aa.cod_archivos_adjuntos = rp.cod_archivos_adjuntos '
        + ' WHERE aa.descripcion = "image" '
        + ' ORDER BY lp.fecha DESC';
    const [result] = await query_simple2(sql);
    return result;
}

