const { Router } = require('express')
const auth = require('../middleware/auth')
const Company = require('../models/company')

const router = Router()

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