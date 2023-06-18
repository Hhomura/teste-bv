const empresa = require('../models/Entities/Empresa')
const bcrypt = require("bcryptjs")
const passport = require("passport");

function verificacaoErros(req, res){
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome Inválido"});
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "email Inválida."})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "senha Inválida."})
    }

    if(req.body.senha.lenght < 4){
        erros.push({texto: "senha pequena."})
    }

    if(!req.body.rsenha || typeof req.body.rsenha == undefined || req.body.rsenha == null){
        erros.push({texto: "senhas Inválida."})
    }
    if(req.body.senha != req.body.rsenha){
        erros.push({texto: "senhas não são iguais."})
    }

    return erros;
}


module.exports ={
    authentificationEmpresa: (req, res, next) =>{
        passport.authenticate("local", {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next)
    },
    
    addEmpresa: (req, res) =>{
            var erros = verificacaoErros(req, res);
    
            if(erros.length > 0){
                res.render("empresa/register", {erros: erros}) 
             }else{
                empresa.findOne({
                    where:{
                        email: req.body.email
                    },
                    attributes: ['email']
                }).then((empresas) =>{
                    if(empresas){
                        console.log("Empresa ja cadastrado");
                        req.flash("error_msg", "Empresa ja cadastrado");
                        res.render("/")
                    }else{

                        senhaHash = req.body.senha;
                        bcrypt.genSalt(10, (erro, salt) =>{
                            bcrypt.hash(senhaHash, salt, (erro, hash) =>{
                                if(erro){
                                    req.flash("error_msg", "erro em salvar");
                                    res.redirect("/")
                                }
                                senha = hash;
                                empresa.create({
                                    nome: req.body.nome,
                                    email: req.body.email,
                                    CNPJ: req.body.cnpj,
                                    descricao: req.body.descricao,
                                    senha: senha
                                }).then(() =>{
                                    req.flash("success_msg", "Empresa registrada com sucesso!")
                                    res.redirect("/");
                                }).catch((error) =>{
                                    req.flash("error_msg", "Houve um erro ao cadastrar: "+error);
                                    res.redirect("/empresa/register");
                                })
                            })
                        })
    
                    }
                }).catch((error) =>{
                    console.log("Erro Brutal" + error);
                })
             }
    },
    logout: (req, res, next) =>{
        req.logout(function(err) {
            if (err) { return next(err) }
            req.flash("success_msg", "Deslogado com sucesso")
            res.redirect('/')
          })
    }
}

/*
*/