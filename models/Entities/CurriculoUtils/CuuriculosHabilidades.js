const db = require('../../DbConnection');

const curriculos = require('../Curriculo');
const habilidades = require('./Habilidades')

const CH = db.sequelize.define('curriculos_habilidades', {
    fkCurriculo: {
        typeof: db.Sequelize.INTEGER,
        references: {
            model: 'curriculos',
            key: 'id'
        }
    },
    fkHabilidades: {
        type: db.Sequelize.INTEGER,
        references:{
            model: 'habilidades',
            id: 'key'
        }
    }
})

curriculos.hasMany(CH, {foreignKey: 'fkCurriculo'})
CH.belongsTo(curriculos, {foreignKey: 'fkCurrilo'})
habilidades.hasMany(CH, {foreignKey: 'fkHabilidades'})
CH.belongsTo(habilidades, {foreignKey: 'fkHabilidades'})

module.exports = CH;