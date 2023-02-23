const Event = require('../models/Event')
const Category = require('../models/Category')


module.exports = {

  //LISTA TODOS OS EVENTOS
  async list(req, res) {
    try {
      const event = await Event.findAll({
        include: {
          association: 'maps',
        },
      });
      return res.json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar os eventos.' });
    }
  },

  //LISTA O EVENTO ESCOLHIDO
  async show(req, res) {
    try {
      const { event_id } = req.params;
      const event = await Event.findByPk(event_id, {
        include: {
          association: 'maps',
        },
      });
      if (!event) {
        return res.status(400).json({ error: 'Evento não encontrado!' });
      }
      return res.json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar o evento.' });
    }
  },

  //REGISTRA UM EVENTO
  async store(req, res) {
    try {
      const { category_id } = req.params;
      const { title } = req.body;

      const category = await Category.findByPk(category_id);

      if (!category) {
        return res.status(400).json({ error: 'Categoria não encontrada!' });
      }

      const [event] = await Event.findOrCreate({
        where: { title },
      });

      await category.addEvent(event);

      return res.json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao registrar o evento.' });
    }
  },

  //ATUALIZA UM EVENTO
  async update(req, res) {
    try {
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
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  //DELETA UM EVENTO
  async delete(req, res) {
    try {
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
    } catch (error) {
      return res.status(400).json(error)
    }
  },

}