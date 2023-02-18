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
    }),
    this.belongsToMany(models.Map, { 
      foreignKey: 'event_id' ,
      through: 'event_maps',
      as: 'maps',
    })
  }
}

module.exports = Event