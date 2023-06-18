const db = require('../../DbConnection');

const habilidades = db.sequelize.define('habilidades', {
    habilidades:{
        typeof: db.Sequelize.STRING
    }
})

module.exports = habilidades