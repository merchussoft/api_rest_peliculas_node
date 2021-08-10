CREATE DATABASE IF NOT EXISTS peliculas;

use peliculas;

CREATE TABLE IF NOT EXISTS list_peliculas (
	cod_list_peliculas INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
	sinopsis VARCHAR(200),
	cod_genero INT(11),
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS genero(
	cod_genero INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL UNIQUE,
	activo TINYINT DEFAULT 1
);

insert into genero(nombre)values('Terror'), ('Accion'),('Aventura'),('Comedia');

CREATE TABLE IF NOT EXISTS archivos_adjuntos (
	cod_archivos_adjuntos INT PRIMARY KEY AUTO_INCREMENT,
	nombre_archivo VARCHAR(250),
	content_type VARCHAR(100),
	tamano INT(11),
	descripcion TEXT,
	ubicacion TEXT,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS relacion_pelicula(
    cod_relacion_pelicula INT PRIMARY KEY AUTO_INCREMENT,
    cod_list_peliculas INT(11),
    cod_archivos_adjuntos INT(11),
    tipo_archivo VARCHAR(20)
);



