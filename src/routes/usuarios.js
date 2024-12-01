var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/resultado", function (req, res) {
    usuarioController.cadastrar_resultado(req, res);
});

router.get("/listar_resultado/:idCadastro", function (req, res) {
    usuarioController.listar_resultado(req, res);
});

router.post("/historico", function (req, res) {
    usuarioController.historico(req, res);
});

router.get("/ver_historico/:idCadastro", function (req, res) {
    usuarioController.ver_historico(req, res);
});

router.get("/listar_tentativas/:idCadastro", function (req, res) {
    usuarioController.listar_tentativas(req, res);
});

router.get("/listar_medias/:idCadastro", function (req, res) {
    usuarioController.listar_medias(req, res);
});

module.exports = router;