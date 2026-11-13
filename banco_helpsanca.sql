CREATE DATABASE helpsanca;

USE helpsanca;

CREATE TABLE usuario (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE problemall (
    id BIGINT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(50) NOT NULL,
    descricao VARCHAR(200),
    horario TIME,
    data_hora DATETIME(6),
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    endereco VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE localidade (
    cep VARCHAR(8) PRIMARY KEY,
    rua VARCHAR(60) NOT NULL,
    proximidade VARCHAR(60) 
);

CREATE TABLE rhresponsavel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    responsavel VARCHAR(60) NOT NULL
);
select* from usuario;
select* from problemall;
select* from localidade;
select* from rhresponsavel;
