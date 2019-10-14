const { Router } = require('express')
const auth = require('../middleware/auth')
const Project = require('../models/project')

const router = Router()

router.post('/', auth, async (req, res) => {
    try {
        let {name, CompanyId} = req.body
        if(!CompanyId) {
            throw new Error('CompanyId empty')
        }
        let project = await Project.create({name, CompanyId})
        res.status(201).json({project})
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.put('/', auth, async (req, res) => {
    try {
        let {ProjectId, name} = req.body
        let project = await Project.findByPk(ProjectId)
        if(!project) {
            throw new Error('Project not found')
        }
        project.name = name
        await project.save()
        res.status(201).json({project})
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

module.exports = router