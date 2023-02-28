const { Model, DataTypes } = require('sequelize')

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'categorys',
      }
    )
  }
  static associate(models) {
    this.belongsToMany(models.Event, {
      foreignKey: 'category_id',
      through: 'category_events',
      as: 'events',
    })
  }
}

module.exports = Category