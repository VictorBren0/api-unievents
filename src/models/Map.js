const { Model, DataTypes } = require('sequelize')

class Map extends Model {
  static init(sequelize) {
    super.init(
      {
        floor: DataTypes.STRING,
        file: DataTypes.STRING,
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `http://localhost/uploads/${this.file}`
          }
        },

      },
      {
        sequelize,
      }
    )
    return this
  }
}

module.exports = Map