//Configuracao do Sequelize para o banco de forma mais simplificada
require('dotenv/config')

module.exports = {
  dialect: 'mysql',
  host: 'aws-sa-east-1.connect.psdb.cloud',
  username: '09of6ovybz04gwukl332',
  password: 'pscale_pw_COxPV8rBw1LfjxxCIXWsbm9j1FbVuZFXLsynNr5C7BR',
  database: 'unigeek',
  port: '3306',
  seedStorage: 'sequelize',
  define: {
    timestamps: true, //saber quando foi criado e atualizado
    underscored: true, //para os dados ficarem clinica_tal, video_tal lloyola
  },
}
