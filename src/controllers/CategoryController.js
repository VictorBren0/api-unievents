const Category = require('../models/Category')
const Yup = require('yup')

module.exports = {

    //LISTA TODAS AS CATEGORIAS
    async list(req, res) {
        const categorys = await Category.findAll({
            include: {
                association: 'events',
            },
        })
        return res.json(categorys)
    },

    //LISTA A CATEGORIA ESCOLHIDA
    async show(req, res) {
        const { id } = req.params
        const category = await Category.findByPk(id, {
            include: {
                association: 'events',
            },
        })
        if (!category) {
            return res.status(400).json({ error: 'Categoria não encontrada!' })
        }
        return res.json(category)
    },

    //REGISTRA UMA CATEGORIA
    async store(req, res) {
        const schema = Yup.object()
            .shape({
                title: Yup.string().required().min(2).max(12),
            })
            .noUnknown()
        try {
            const validFields = await schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            })

            const { id, title } = await Category.create(
                validFields
            )
            return res.json({ id, title })
        } catch (error) {
            return res.status(400).json(error)
        }
    },

    //ATUALIZA UMA CATEGORIA
    async update(req, res) {
        const { id } = req.params
        const schema = Yup.object()
            .shape({
                title: Yup.string().min(2).max(12),
            })
            .noUnknown()
        try {
            const category = await Category.findByPk(id)
            if (!category) {
                return res.status(400).json({ error: 'Categoria não encontrada!' })
            }
            const validFields = await schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            })
            const { title } = await category.update(validFields)
            return res.json({ title })
        } catch (error) {
            return res.status(400).json(error)
        }
    },

    //DELETA UMA CATEGORIA
    async delete(req, res) {
        const { id } = req.params
        const category = await Category.findByPk(id)
        if (!category) {
            return res.status(400).json({ error: 'Categoria não encontrada!' })
        }
        const delcategory = await Category.findOne({
            where: { id },
        })

        await category.destroy(delcategory)

        return res.status(200).json({ mensagem: 'Categoria deletada com sucesso!' })
    },
}