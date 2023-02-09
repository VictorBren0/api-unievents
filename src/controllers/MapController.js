const Map = require('../models/Map')

module.exports = {

  //LISTA TODOS OS MAPAS
  async list(req, res) {
    const maps = await Map.findAll()
    return res.json(maps)
  },

  //LISTA O MAPA ESCOLHIDO
  async show(req, res) {
    const { map_id } = req.params
    const map = await Map.findByPk(map_id)
    if (!map) {
      return res.status(400).json({ error: 'Local não encontrado!' })
    }
    return res.json(map)
  },

//REGISTRA UM MAPA
  async store(req, res) {
    const { floor } = req.body
    const { originalname, filename } = req.file
    const map = await Map.create({ floor, name: originalname, file: filename })
    return res.json(map)
  },

  //ATUALIZA UM USUARIO
  async update(req, res) {
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
  },

//DELETA UM MAPA
  async delete(req, res) {
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
  },

}