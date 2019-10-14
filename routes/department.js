const { Router } = require('express')
const auth = require('../middleware/auth')
const Department = require('../models/department')

const router = Router()

router.post('/', auth, async (req, res) => {
    try {
        let {name, CompanyId} = req.body
        if(!CompanyId) {
            throw new Error('CompanyId empty')
        }
        let department = await Department.create({name, CompanyId})
        res.status(201).json({department})
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.put('/', auth, async (req, res) => {
    try {
        let {DepartmentId, name} = req.body
        let department = await Department.findByPk(DepartmentId)
        if(!department) {
            throw new Error('Department not found')
        }
        department.name = name
        await department.save()
        res.status(201).json({department})
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})
module.exports = router