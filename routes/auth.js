const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const router = Router()

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        let user = await User.findOne({
            where: {email}
        })
        if(user) {
            const isLogin = await bcrypt.compare(password, user.password)
            if(isLogin) {
                return res.json({token: jwt.sign({id: user.id}, config.JWT_SECRET)})
            }
        }

        res.status(401).json({error: 'Unauthorized'})
    } catch (e) {
        res.status(500).json({error: e})
    }
})
module.exports = router