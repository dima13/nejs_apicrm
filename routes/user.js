const { Router } = require('express')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const User = require('../models/user')
const Project = require('../models/project')
const Company = require('../models/company')
const Department = require('../models/department')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        let users = await User.findAll({
            attributes: ['id', 'name', 'email'],
            include: [
                {model: Company, attributes: ['id', 'name']},
                {model: Department, attributes: ['id', 'name']},
                {
                    model: Project,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        let {id} = req.params
        let user = await User.findByPk(id, {
            attributes: ['id', 'name', 'email'],
            include: [
                {model: Company, attributes: ['id', 'name']},
                {model: Department, attributes: ['id', 'name']},
                {
                    model: Project,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]           
        })
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.post('/', auth, async (req, res) => {
    try {
        let {name, email, password, CompanyId} = req.body
        if(!CompanyId) {
            throw new Error('CompanyId empty')
        }
        let user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            CompanyId
        })
        res.status(201).json({user})
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.put('/', auth, async (req, res) => {
    try {
        let {UserId, name, email, password} = req.body
        let user = await User.findByPk(UserId)
        if(name)
            user.name = name
        if(email)
            user.email = email
        if(password)
            user.password = await bcrypt.hash(password, 10)
        user.save()
        res.status(201).json({user})
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.put('/addDepartment', auth, async (req, res) => {
    try {
        let {UserId, DepartmentId} = req.body
        let user = await User.findByPk(UserId)
        if(!user) {
            throw new Error('User not found')
        }
        user.DepartmentId = DepartmentId
        await user.save()
        res.status(200).json({msg: `Add department for user ${user.name}`})
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.post('/addProject', auth, async (req, res) => {
    try {
        let {UserId, ProjectId} = req.body
        let user = await User.findByPk(UserId)
        let project = await Project.findByPk(ProjectId)
        if(!user || !project) {
            throw new Error('Data incorrect')
        }
        await user.addProject(project, {throught:{}})
        res.status(200).json({msg: `Add project for user ${user.name}`})
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

module.exports = router