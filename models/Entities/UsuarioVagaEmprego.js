const usuarios = require("../models/DiasLetivos");
const vaga_emprego = require("../models/Turmas");

const usuario_vaga_emprego = db.sequelize.define('usuario_vaga_emprego', {
    fkUsuario: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    fkVagaEmprego: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'vaga_emprego',
            key: 'id'
        }
    }
})

usuario_vaga_emprego.sync({force:true});

usuarios.hasMany(usuario_vaga_emprego, {foreignKey: 'fkUsuario'})
usuario_vaga_emprego.belongsTo(usuarios, {foreignKey: 'fkUsuario'})
vaga_emprego.hasMany(usuario_vaga_emprego, {foreignKey: 'fkVagaEmprego'})
usuario_vaga_emprego.belongsTo(vaga_emprego, {foreignKey: 'fkVagaEmprego'})

//turmaDia.sync({force: true});

module.exports = usuario_vaga_emprego;