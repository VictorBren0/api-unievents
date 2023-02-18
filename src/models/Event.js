const { Model, DataTypes } = require('sequelize')

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }
  static associate(models) {
    this.belongsToMany(models.Category, { 
      foreignKey: 'event_id' ,
      through: 'category_events',
      as: 'categorys',
    })
  }
}

module.exports = Event