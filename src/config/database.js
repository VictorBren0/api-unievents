//Configuracao do Sequelize para o banco de forma mais simplificada
require('dotenv/config')

module.exports = {
  dialect: 'postgres',
  host: 'dpg-cfmhh7arrk07m3ua4m0g-a',
  username: 'victor',
  password: 'dexXEONrjfGQLbFmRG8yBatmmDm4hlPW',
  database: 'apiunigeek',
  port: '3306',
  seedStorage: 'sequelize',
  define: {
    timestamps: true, //saber quando foi criado e atualizado
    underscored: true, //para os dados ficarem clinica_tal, video_tal lloyola
  },
}
