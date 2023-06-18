const Sequelize = require('sequelize')
const sequelize = new Sequelize('buscandovagas', 'root', '080199', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports ={
    Sequelize: Sequelize,
    sequelize: sequelize,

    testeConexão : function connection(){
        sequelize.authenticate().then(() =>{
            console.log("Banco conectado com sucesso!!")
        }).catch((error) => {
            console.log(`Erro na conexão: ${error}`)
        })
    }
}