const { Model, DataTypes } = require('sequelize')

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        date: DataTypes.STRING,
        time: DataTypes.STRING,
        description: DataTypes.STRING,
        posy: DataTypes.DOUBLE,
        posx: DataTypes.DOUBLE
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