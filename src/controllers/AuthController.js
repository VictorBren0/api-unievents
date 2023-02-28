const User = require('../models/User')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = {
  async login(req, res) {
    const { login, password } = req.body

    const user = await User.findOne({ where: { login } })

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado!' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha invalida!' })
    }

    const { id, email } = user

    return res.json({
      user: { id, login, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  },
}