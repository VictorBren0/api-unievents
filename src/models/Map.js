const { Model, DataTypes } = require('sequelize')

class Map extends Model {
  static init(sequelize) {
    super.init(
      {
        floor: DataTypes.STRING,
        file: DataTypes.STRING,
        name: DataTypes.STRING,
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `http://192.168.100.8:3000/uploads/${this.file}`
          }
        },

      },
      {
        sequelize,
      }
    )
    return this
  }
  static associate(models) {
    this.belongsToMany(models.Category, {
      foreignKey: 'map_id',
      through: 'category_maps',
      as: 'categorys',
    })
  }
}

module.exports = Map