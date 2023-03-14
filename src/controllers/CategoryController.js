const Category = require('../models/Category')
const Yup = require('yup')

module.exports = {

    //LISTA TODAS AS CATEGORIAS
    async list(req, res) {
        try {
            const categorys = await Category.findAll({
                include: {
                    association: 'events',
                    include: {
                        association: 'maps',
                    },
                },
            })

            return res.json(categorys)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Ocorreu um erro ao buscar as categorias.' })
        }
    },

    //LISTA A CATEGORIA ESCOLHIDA
    async show(req, res) {
        try {
            const { id } = req.params
            const category = await Category.findByPk(id, {
                include: {
                    association: 'events',
                    include: {
                        association: 'maps',
                    },
                },
            })
            if (!category) {
                return res.status(400).json({ error: 'Categoria não encontrada!' })
            }
            return res.json(category)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Ocorreu um erro ao buscar a categoria.' })
        }
    },

    //REGISTRA UMA CATEGORIA
    async store(req, res) {
        try {
            const schema = Yup.object()
                .shape({
                    title: Yup.string().required().min(2).max(36),
                })
                .noUnknown()
            const validFields = await schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            })

            const { id, title } = await Category.create(
                validFields
            )
            return res.json({ id, title })
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: 'Erro ao criar categoria.' })
        }
    },

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
            console.error(error)
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {}
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message
                })
                return res.status(400).json(validationErrors)
            }
            return res.status(500).json({ error: 'Ocorreu um erro ao atualizar a categoria.' })
        }
    },

    //DELETA UMA CATEGORIA
    async delete(req, res) {
        const { id } = req.params

        try {
            const category = await Category.findByPk(id)
            if (!category) {
                return res.status(400).json({ error: 'Categoria não encontrada!' })
            }

            const delcategory = await Category.findOne({
                where: { id },
            })

            await category.destroy(delcategory)

            return res.status(200).json({ mensagem: 'Categoria deletada com sucesso!' })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Ocorreu um erro ao deletar a categoria.' })
        }
    }
}