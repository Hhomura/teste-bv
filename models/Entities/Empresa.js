const db = require('../DbConnection')

const empresas = db.sequelize.define('empresas', {
    nome: {
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
    CNPJ: {
        type: db.Sequelize.STRING,
        require: true
    },
    descricao: {
        type: db.Sequelize.TEXT,
        require: true
    }
})

//empresas.sync({force: true})

module.exports = empresas;