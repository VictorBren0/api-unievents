//Onde usamos o sequelize para falzer a conecao com o banco

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Category = require('../models/Category');
const Map = require('../models/Map');




const connection = new Sequelize(dbConfig)

User.init(connection)
Category.init(connection)
Map.init(connection)




Category.associate(connection.models)
Map.associate(connection.models)



module.exports = connection
