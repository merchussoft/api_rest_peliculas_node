/**
 * Aqui vamos a instanciar los metodos de consultas a la base de datos.
 */

// const conexion = require('./Database');
const promisePool = require('./Database');

// exports.query_simple = async (query = '') => {
//     return await conexion.query(query).catch((error) => {
//         console.log('mirando el eerror ', error);
//     });
// }
//
// exports.obtiene_datos = async (data = {}) =>{
//     let campos = ('lista_campos' in data) ? data.lista_campos.toString() : '*';
//     let adicional = ('adicional' in data) ? data.adicional : '';
//     let campo = ('campo' in data) ? data.campo : 1;
//     let valor = ('valor' in data) ? data.valor : 1;
//     let select = `SELECT ${campos} FROM ${data.table} WHERE ${campo} = ${valor} ${adicional}`;
//     return await this.query_simple(select)
// }

exports.obtiene_datos2 = async (data = {}) =>{
    let campos = ('lista_campos' in data) ? data.lista_campos.toString() : '*';
    let adicional = ('adicional' in data) ? data.adicional : '';
    let campo = ('campo' in data) ? data.campo : 1;
    let valor = ('valor' in data) ? data.valor : 1;
    let select = `SELECT ${campos} FROM ${data.table} WHERE ${campo} = ${valor} ${adicional}`;
    return await promisePool.query(select).catch((error) => {error_return(error)});
}

exports.query_simple2 = async (query = '') => {
    return await promisePool.query(query).catch((error) => {error_return(error)});
}

exports.insertDatos = async (tabla='', data_insert = {}) =>{
    let array_campos = Object.keys(data_insert);
    let campos= array_campos.toString();
    let values = [];
    array_campos.forEach((i, o) => values.push(`'${data_insert[i]}'`));
    let sql = `INSERT INTO ${tabla}(${campos})VALUES(${values.toString()})`;
    const [result] = await promisePool.query(sql).catch((error) => {error_return(error)});
    return result.insertId;
}

function error_return(error) {
    return_error = {};
    return_error.sql = error.sql;
    return_error.sqlMessage = error.sqlMessage;
    return_error.code = error.code;
    return_error.errno = error.errno;
    console.log('mirando la data de aqui ', return_error);
}
