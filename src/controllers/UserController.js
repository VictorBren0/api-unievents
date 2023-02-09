const User = require('../models/User')
const Yup = require('yup')

module.exports = {

  //LISTA TODOS OS USUARIOS
  async list(req, res) {
    const { page = 1 } = req.query

    const user = await User.findAll({
      attributes: ['id', 'login', 'email', 'is_admin'],
      limit: 20,
      offset: (page - 1) * 20,
    })
    return res.json(user)
  },

  //LISTA O USUARIO ESCOLHIDO
  async show(req, res) {
    const { id } = req.params

    const user = await User.findByPk(id, {
      attributes: ['id', 'login', 'email', 'is_admin'],
    })

    return res.json(user)
  },

  //REGISTRA UM USUARIO
  async store(req, res) {
    const schema = Yup.object()
      .shape({
        email: Yup.string().email().required().max(120),
        login: Yup.string().required().max(20),
        password: Yup.string().required().min(8),
      })
      .noUnknown()

    try {
      const emailExists = await User.findOne({
        where: {
          email: req.body.email,
        },
      })
      const loginExists = await User.findOne({
        where: {
          login: req.body.login,
        },
      })

      if (emailExists || loginExists) {
        return res.status(409).json({ error: 'Usuario já cadastrado!' })
      }
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      const { id, email, login, is_admin } = await User.create(
        validFields
      )

      return res.json({ id, email, login, is_admin })
    } catch (error) {
      return res.status(400).json(error)
    }
  },

  //ATUALIZA UM USUARIO
  async update(req, res) {
    const schema = Yup.object()
      .shape({
        password: Yup.string().min(8),
        password_confirm: Yup.string().required().min(8),
      })
      .noUnknown()

    try {
      const user = await User.findByPk(req.userID)

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado!' })
      }
      if (password !== password_confirm) {
        return res.status(409).json({ error: 'As senhas não conhecidem!' })
      }
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      const { login } = await user.update(validFields)

      return res.json({ login })
    } catch (error) {
      return res.status(400).json(error)
    }
  },
}