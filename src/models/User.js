const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: DataTypes.STRING(),
        login: DataTypes.STRING(),
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        is_admin: DataTypes.BOOLEAN,
      },
      {
        sequelize
      }
    )
    this.addHook('beforeSave', async (User) => {
      if (User.password) {
        User.password_hash = await bcrypt.hash(User.password, 8)
      }
    })
    return this
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }

}

module.exports = User