const express = require("express");
const router = express.Router();
const vagasDAO = require("../controllers/VagasDAO");

router.get('/register/', (req, res) =>{
    res.render("vagas/register")
})

router.post('/register/:id', (req, res) =>{
    vagasDAO.addVaga(req, res);
})


router.get('/abertas/:id', (req, res) =>{
    vagasDAO.showVagas(req, res);
})

module.exports = router;