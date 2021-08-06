/**
 * Aqui vamos a instanciar los metodos de consultas a la base de datos.
 */

const conexion = require('./Database');

exports.query_simple = async (query = '') => {
    return await conexion.query(query).catch((error) => {
        console.log(error);
    });
}

exports.obtiene_datos = async (data = {}) =>{
    let campos = ('lista_campos' in data) ? data.lista_campos.toString() : '*';
    let adicional = ('adicional' in data) ? data.adicional : '';
    let campo = ('campo' in data) ? data.campo : 1;
    let valor = ('valor' in data) ? data.valor : 1;
    let select = `SELECT ${campos} FROM ${data.table} WHERE ${campo} = ${valor} ${adicional}`;
    return await this.query_simple(select)
}
