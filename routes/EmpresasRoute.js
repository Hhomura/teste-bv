const express = require("express");
const router = express.Router();
const empresaDAO = require("../controllers/EmpresasDAO");

router.get('/login', (req, res) =>{
    res.render("empresa/login")
})

router.get('/register', (req, res) =>{
    res.render("empresa/register")
})

router.post('/register', (req, res) =>{
    empresaDAO.addEmpresa(req, res);
})

router.post('/login', (req, res, next) =>{
    empresaDAO.authentificationEmpresa(req, res, next);
})

router.get('/logout', (req, res, next) =>{
    empresaDAO.logout(req, res, next);
})

module.exports = router;