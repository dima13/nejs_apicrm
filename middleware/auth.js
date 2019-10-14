const jwt = require('express-jwt')
const User = require('../models/user')
const config = require('../config/config')

const getTokenFromHeader = (req) => {
    // if (req.query.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    //   return req.headers.authorization.split(' ')[1]
    // }
    if(req.query.token) {
        return req.query.token
    }
}

const userInfo = async function(req, res, next) {
    try {
        let user = await User.findByPk(req.token.id)  
        if(user) {
            req.user = user
        }
        next()
    } catch (e) {
        console.log(e)
    }
}

module.exports = [
    jwt({
        secret: config.JWT_SECRET,
        userProperty: 'token',
        getToken: getTokenFromHeader
    }),
    userInfo
]