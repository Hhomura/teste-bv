const db = require ('../DbConnection');

const usuario = db.sequelize.define('Usuarios', {
    nome:{
        type: db.Sequelize.STRING,
        require: true
    },
    email:{
        type: db.Sequelize.STRING,
        require: true
    },
    senha:{
        type: db.Sequelize.STRING,
        require: true
    },
    rg: {
        type: db.Sequelize.STRING,
        require: true
    },
    cpf: {
        type: db.Sequelize.STRING,
        require: true
    }
    /*,
    telefone: {
        type: db.Sequelize.STRING,
        require: true
    },
    endereço: {
        type: db.Sequelize.STRING,
        require: true
    },
    tipo_contrato: {
        type: db.Sequelize.STRING,
        require: true
    }
    */
})

//usuario.sync({force:true})

module.exports = usuario;