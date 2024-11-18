CREATE DATABASE musicnflutes;

USE musicnflutes;

CREATE TABLE cadastro (
idCadastro INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (45),
sobrenome VARCHAR (45),
email VARCHAR (45),
senha VARCHAR (45)
);

CREATE TABLE resultado (
idResultado INT PRIMARY KEY AUTO_INCREMENT,
qtdAcertos VARCHAR (45),
fkCadastro INT,
	CONSTRAINT fkResultadoCadastro FOREIGN KEY (fkCadastro) REFERENCES Cadastro(idCadastro)
);


