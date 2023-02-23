const Map = require('../models/Map')
const Event = require('../models/Event')
const Category = require('../models/Category')

module.exports = {

  //LISTA TODOS OS MAPAS
  async list(req, res) {
    try {
      const maps = await Map.findAll()
      return res.json(maps)
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar os mapas.' })
    }
  },

  //LISTA O MAPA ESCOLHIDO
  async show(req, res) {
    try {
      const { map_id } = req.params
      const map = await Map.findByPk(map_id)
      if (!map) {
        return res.status(400).json({ error: 'Local não encontrado!' })
      }
      return res.json(map)
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar o mapa.' })
    }
  },

  //REGISTRA UM MAPA
  async store(req, res) {
    try {
      const { floor } = req.body
      const { originalname, filename } = req.file
      const map = await Map.create({ floor, name: originalname, file: filename })
      return res.json(map)
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao criar o mapa.' })
    }
  },

  //ATUALIZA UM MAPA
  async update(req, res) {
    try {
      const { id } = req.params
      const { floor } = req.body
      const { originalname, filename } = req.file
      const map = await Map.findByPk(id)
      if (!map) {
        return res.status(400).json({ error: 'Mapa não encontrado!' })
      }
      await Map.update(
        {
          floor: floor,
          name: originalname,
          file: filename
        },
        {
          where: { id: id }
        }
      )
      return res.status(200).json({ mensagem: 'Mapa alterado com sucesso!' })
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao atualizar o mapa.' })
    }
  },

  //DELETA UM MAPA
  async delete(req, res) {
    try {
      const { id } = req.params
      const map = await Map.findByPk(id)
      if (!map) {
        return res.status(400).json({ error: 'Mapa não encontrado!' })
      }
      const delmap = await Map.findOne({
        where: { id },
      })
      await map.destroy(delmap)
      return res.status(200).json({ mensagem: 'Mapa deletado com sucesso!' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Erro ao deletar o mapa.' })
    }
  },

  //ADICIONA UM EVENTO A UM MAPA
  async storeEventToMap(req, res) {
    const { map_id, event_id } = req.params;

    try {
      const map = await Map.findByPk(map_id, {
        include: [{
          model: Event,
          as: 'events'
        }]
      });

      if (!map) {
        return res.status(400).json({ error: 'Mapa não encontrado!' });
      }

      const event = await Event.findByPk(event_id);

      if (!event) {
        return res.status(400).json({ error: 'Evento não encontrado!' });
      }

      await map.addEvent(event);

      return res.status(200).json({ mensagem: 'Evento adicionado ao mapa com sucesso!' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao adicionar o evento ao mapa.' });
    }
  },

  //REMOVE UM EVENTO DE UM MAPA
  async deleteEventFromMap(req, res) {
    try {
      const { map_id, event_id } = req.params;

      const map = await Map.findByPk(map_id, {
        include: [{
          model: Event,
          as: 'events'
        }]
      });

      if (!map) {
        return res.status(400).json({ error: 'Mapa não encontrado!' });
      }

      const event = await Event.findByPk(event_id);

      if (!event) {
        return res.status(400).json({ error: 'Evento não encontrado!' });
      }

      await map.removeEvent(event);

      return res.status(200).json({ mensagem: 'Evento removido do mapa com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao remover o evento do mapa.' });
    }
  },

 //LISTA TODOS OS EVENTOS DE UM MAPA
  async listEventFromMap(req, res) {
    try {
      const { map_id } = req.params;

      const map = await Map.findByPk(map_id, {
        include: [{
          model: Event,
          as: 'events'
        }]
      });

      if (!map) {
        return res.status(400).json({ error: 'Mapa não encontrado!' });
      }

      return res.json(map.events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao listar os eventos do mapa.' });
    }
  }

}