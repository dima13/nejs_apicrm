const { Router } = require('express')
const auth = require('../middleware/auth')
const Project = require('../models/project')
const Company = require('../models/company')
const User = require('../models/user')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        let projects = await Project.findAll({
            attributes: ['id', 'name'],
            include: [
                {model: Company, attributes: ['id', 'name']},
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
        res.status(200).json(projects)
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        let {id} = req.params
        let project = await Project.findByPk(id, {
            attributes: ['id', 'name'],
            include: [
                {model: Company, attributes: ['id', 'name']},
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                    through: {
                        attributes: []
                    }
                }
            ]        
        })
        res.status(200).json(project)
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

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