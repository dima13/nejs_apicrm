const { Router } = require('express')
const auth = require('../middleware/auth')
const Company = require('../models/company')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        let companies = await Company.findAll({
            attributes: ['id', 'name']
        })
        res.status(200).json(companies)
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        let {id} = req.params
        let company = await Company.findByPk(id, {
            attributes: ['id', 'name']         
        })
        res.status(200).json(company)
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.post('/', auth, async (req, res) => {
    try {
        let {name} = req.body
        let company = await Company.create({name})
        res.status(201).json({company})
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

module.exports = router