const db = require('../DbConnection')

const usuarios = require('./Usuario');

const curriculos = db.sequelize.define('curriculos', {
    fkUsuario:{
        type: db.Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    Titulo:{
        type: db.Sequelize.STRING,
        require: true
    },
    descricao:{
        type: db.Sequelize.TEXT,
        require: true
    }
})

curriculos.belongsTo(usuarios, {foreignKey: 'fkUsuario', allowNull: false});

module.exports = curriculos;