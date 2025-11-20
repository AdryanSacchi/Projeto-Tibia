-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE projeto_tibia;
USE projeto_tibia;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL,
    servidor VARCHAR(45)
);

CREATE TABLE personagem (
    id_personagem INT PRIMARY KEY AUTO_INCREMENT,
    nick_name VARCHAR(45) UNIQUE NOT NULL,
    classe VARCHAR(45),
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    forca INT,
    agilidade INT,
    inteligencia INT,
    resistencia INT,
    sorte INT
);

CREATE TABLE dungeon (
    id_dungeon INT PRIMARY KEY AUTO_INCREMENT,
    vida_final INT,
    piso_final INT,
    data_participacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personagem_dungeon (
    fk_personagem INT,
    fk_dungeon INT,
    PRIMARY KEY (fk_personagem, fk_dungeon),
    FOREIGN KEY (fk_personagem) REFERENCES personagem(id_personagem),
    FOREIGN KEY (fk_dungeon) REFERENCES dungeon(id_dungeon)
);

SELECT * FROM usuario;