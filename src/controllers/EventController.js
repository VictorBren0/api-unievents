const Event = require('../models/Event')
const Category = require('../models/Category')

module.exports = {

  //LISTA TODAS AS SUBCATEGORIAS
  async list(req, res) {
    const event = await Event.findAll()
    return res.json(event)
  },

  //LISTA A SUBCATEGORIA ESCOLHIDA
  async show(req, res) {
    const { event_id } = req.params
    const event = await Event.findByPk(event_id)
    if (!event) {
      return res.status(400).json({ error: 'Evento não encontrado!' })
    }
    return res.json(event)
  },

  //REGISTRA UMA SUBCATEGORIA
  async store(req, res) {
    const { category_id } = req.params;
    const { title } = req.body;
  
    const category = await Category.findByPk(category_id)
  
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada!' });
    }
  
    const [event] = await Event.findOrCreate({
      where: { title },
    });
  
    await category.addEvent(event);
  
    return res.json(event);
  },
  

  //ATUALIZA UMA SUBCATEGORIA
  async update(req, res) {
    const { id } = req.params
    const { category_id } = req.params
    const { title } = req.body

    const category = await Category.findByPk(category_id)
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada!' })
    }

    const event = await Event.findByPk(id)
    if (!event) {
      return res.status(400).json({ error: 'Evento não encontrado!' })
    }

    await Event.update(
      {
        title: title,
      },
      { where: { id: id } }
    )

    return res.status(200).json({ mensagem: 'Evento alterado com sucesso!' })
  },

  async delete(req, res) {
    const { category_id } = req.params
    const { id } = req.body
    const category = await Category.findByPk(category_id)
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada!' })
    }

    const event = await Event.findOne({
      where: { id },
    })
    if (!event) {
      return res.status(400).json({ error: 'SubCategoria não encontrada!' })
    }
    await category.removeEvent(event)
    return res.status(200).json({ mensagem: 'Evento deletado com sucesso!' })
  },


}