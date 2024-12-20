var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            // .then((resultadoAquarios) => {

                                // if (resultadoAquarios.length > 0) {
                                    res.json({
                                        idCadastro: resultadoAutenticar[0].idCadastro,
                                        nome: resultadoAutenticar[0].nome,
                                        sobrenome: resultadoAutenticar[0].sobrenome,
                                        email: resultadoAutenticar[0].email
                                        // cpf: resultadoAutenticar[0].cpf,
                                        // aquarios: resultadoAquarios
                                    });
                                // } else {
                                //     res.status(204).json({ aquarios: [] });
                                // }
                            // })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
   

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sobrenome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function cadastrar_resultado(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var acertos = req.body.qtdAcertos;
    var erros = req.body.qtdErros;
    var fkCadastro = req.body.fkCadastro;
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar_resultado(acertos, erros, fkCadastro)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    function listar_resultado (req, res) {
        const {idCadastro} = req.params;  // Só o idUsuario é necessário para buscar as notas
    
    
        usuarioModel.listar_resultado(idCadastro)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    // Se encontrar resultados, retorna as Notas
                    res.status(200).json(resultado);
                } else {
                    // Caso contrário, retorna uma resposta vazia (nenhum favorito encontrado)
                    res.status(204).json([]);
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as notas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }

    function historico (req, res) {
        // const {linha_historico, fkCadastro} = req.params;  // Só o idUsuario é necessário para buscar as notas
    
        var linha_historico = req.body.linha_historico;
        var fkCadastro = req.body.fkCadastro;
       
       
    
        usuarioModel.historico(linha_historico, fkCadastro)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    // Se encontrar resultados, retorna as Notas
                    res.status(200).json(resultado);
                } else {
                    // Caso contrário, retorna uma resposta vazia (nenhum favorito encontrado)
                    res.status(204).json([]);
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as notas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }

    function ver_historico (req, res) {
        const {idCadastro} = req.params;  // Só o idUsuario é necessário para buscar as notas
    
    
        usuarioModel.ver_historico(idCadastro)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    // Se encontrar resultados, retorna as Notas
                    res.status(200).json(resultado);
                } else {
                    // Caso contrário, retorna uma resposta vazia (nenhum favorito encontrado)
                    res.status(204).json([]);
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as notas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }

    function listar_medias (req, res) {
        const {idCadastro} = req.params;  // Só o idUsuario é necessário para buscar as notas
    
    
        usuarioModel.listar_medias(idCadastro)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    // Se encontrar resultados, retorna as Notas
                    res.status(200).json(resultado);
                } else {
                    // Caso contrário, retorna uma resposta vazia (nenhum favorito encontrado)
                    res.status(204).json([]);
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as notas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }

    function listar_tentativas (req, res) {
        const {idCadastro} = req.params;  // Só o idUsuario é necessário para buscar as notas
    
    
        usuarioModel.listar_tentativas(idCadastro)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    // Se encontrar resultados, retorna as Notas
                    res.status(200).json(resultado);
                } else {
                    // Caso contrário, retorna uma resposta vazia (nenhum favorito encontrado)
                    res.status(204).json([]);
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as notas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }

    function listar_ranking (req, res) {
        const {idCadastro} = req.params;  // Só o idUsuario é necessário para buscar as notas
    
    
        usuarioModel.listar_ranking(idCadastro)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    // Se encontrar resultados, retorna as Notas
                    res.status(200).json(resultado);
                } else {
                    // Caso contrário, retorna uma resposta vazia (nenhum favorito encontrado)
                    res.status(204).json([]);
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as notas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }

module.exports = {
    autenticar,
    cadastrar,
    cadastrar_resultado,
    listar_resultado,
    historico,
    ver_historico,
    listar_medias,
    listar_tentativas,
    listar_ranking
}