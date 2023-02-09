const { Model, DataTypes } = require('sequelize')

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        event: DataTypes.STRING,
        locale: DataTypes.STRING,
      },
      {
        sequelize,
      }
    )
  }
  static associate(models) {
    this.belongsToMany(models.Map, {
      foreignKey: 'category_id',
      through: 'category_maps',
      as: 'maps',
    })
  }
}

module.exports = Category