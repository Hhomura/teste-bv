const express = require("express");
const router = express.Router();
const usuariosDAO = require("../controllers/UsuariosDAO");

router.get('/register/', (req, res) =>{
    res.render("usuario/register")
})

router.get('/login/', (req, res) =>{
    res.render('usuario/login')
})

router.post('/register/', (req, res) =>{
    usuariosDAO.cadastrarUsuario(req, res);
})

router.post('/login/', (req, res) =>{
    usuariosDAO.authentificationUsuario(req, res);
})

router.get('/logout', (req, res, next) =>{
    usuariosDAO.logout(req, res, next);
})

module.exports = router;