const { listar } = require("../controllers/usuarioController");
var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idCadastro, nome, sobrenome, email FROM cadastro WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, sobrenome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO cadastro (nome, sobrenome, email, senha) VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar_resultado(acertos, erros, fkCadastro) {
    
    var instrucaoSql = `
        INSERT INTO resultado (qtdAcertos, qtdErros, fkCadastro) VALUES ('${acertos}', '${erros}', '${fkCadastro}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar_resultado(idCadastro) {
    
    var instrucaoSql = `
      SELECT SUM(qtdAcertos) AS qtdAcertos, SUM(qtdErros) AS qtdErros
      FROM resultado WHERE fkCadastro = ${idCadastro};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function historico(linha_historico, fkCadastro) {
    
    var instrucaoSql = `
        INSERT INTO historico (linha_historico, fkCadastro) VALUES ('${linha_historico}', '${fkCadastro}');
    `;
   
    return database.executar(instrucaoSql);
}


function listar_resultado(idCadastro) {
    
    var instrucaoSql = `
      SELECT SUM(qtdAcertos) AS qtdAcertos, SUM(qtdErros) AS qtdErros
      FROM resultado WHERE fkCadastro = ${idCadastro};
    `;
   
    return database.executar(instrucaoSql);
}

function ver_historico(idCadastro) {
    
    var instrucaoSql = `

    SELECT * FROM historico 
    WHERE fkCadastro = ${idCadastro};

    `;
   
    return database.executar(instrucaoSql);
}

function listar_tentativas(idCadastro) {
    
    var instrucaoSql = `
    SELECT COUNT(idHistorico) as qtd_tentativas FROM historico WHERE fkCadastro = ${idCadastro};
    `;
   
    return database.executar(instrucaoSql);
}

function listar_medias(idCadastro) {
    
    var instrucaoSql = `
    SELECT TRUNCATE(avg(qtdAcertos), 2) as media_acertos FROM resultado JOIN cadastro ON fkCadastro = idCadastro WHERE fkCadastro = ${idCadastro};
    `;
   
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrar_resultado,
    listar_resultado,
    historico,
    ver_historico,
    listar_medias,
    listar_tentativas
};