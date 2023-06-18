const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const empresa = require("../models/Entities/Empresa");

module.exports = (passport) =>{
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) =>{
        empresa.findOne({where: {email: email}}).then((empresa) =>{
            if(!empresa){
                return done(null, false, {message: "Essa conta não existe"})
            }

            bcrypt.compare(senha, empresa.senha, (erro, check) =>{
                if(check){
                    console.log("Verificando senha");
                    return done(null, empresa, {message: "Logado com sucesso!"})
                }else{
                    return done(null, false, {message: "senha incorreta"});
                }
            })
        })
    }))

    passport.serializeUser((empresa, done) =>{
        done(null, empresa.id);
    })

    passport.deserializeUser((id, done) =>{
        empresa.findByPk(id).then((empresa) =>{
            done(null, empresa)
        }).catch((err) =>{
            done(err, null);
        })
    })
}