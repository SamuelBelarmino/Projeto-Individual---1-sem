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


module.exports = router;