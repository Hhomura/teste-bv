const vagas = require('../models/Entities/VagaEmprego')
const empresa = require('../models/Entities/Empresa')

module.exports ={

    addVaga: (req, res) =>{
        var titulo = req.body.titulo;
        var descricao = req.body.descricao;
        var fkEmpresa = req.params.id
    
        vagas.create({
            fkEmpresa: fkEmpresa,
            titulo: titulo,
            descricao: descricao
        }).then(()=>{
            req.flash("success_msg", "Vaga Publicada!")
            res.redirect("/")
        }).catch((error) =>{
            req.flash("error_msg", "Erro ao cadastrar vaga: "+error);
            res.redirect("/")
        })
    },

    showVagas: (req, res) => {

        const fkEmpresa = req.params.id;

        console.log(fkEmpresa)

        vagas.findAll({
          where: {
            fkEmpresa: fkEmpresa
          },
          include:[{
            model: empresa
          }]
        })
        .then((vagas) => {
            res.render('vagas/vagas', { vagas: vagas });
          })
          .catch((error) => {
            req.flash("error_msg", "Erro na Lógica " + error);
            res.redirect('/');
          });
      }
      

}