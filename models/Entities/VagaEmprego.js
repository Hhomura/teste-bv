const db = require('../DbConnection')

const empresa = require('./Empresa')

const vaga_emprego = db.sequelize.define('vaga_emprego', {
    
    fkEmpresa:{
        type: db.Sequelize.INTEGER,
        require: true,
        references:{
            model: 'empresas',
            id: 'key'
        }
    },
    titulo:{
        type: db.Sequelize.STRING
    },
    descricao:{
        type:db.Sequelize.STRING
    },

})

//vaga_emprego.sync({force:true})

vaga_emprego.belongsTo(empresa, {foreignKey: 'fkEmpresa', allowNull: false});

module.exports = vaga_emprego;
