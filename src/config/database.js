//Configuracao do Sequelize para o banco de forma mais simplificada
require('dotenv/config')

module.exports = {
  dialect: 'mysql',
  host: 'db4free.net',
  username: 'victorbreno',
  password: '12345678',
  database: 'apiunigeek',
  port: '3306',
  seedStorage: 'sequelize',
  define: {
    timestamps: true, //saber quando foi criado e atualizado
    underscored: true, //para os dados ficarem clinica_tal, video_tal lloyola
  },
}