const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const User = require('../models/user')
const Department = require('../models/department')
const Project = require('../models/project')

const Company = sequelize.define("Company", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'shevtsov_companies'
})

Company.hasMany(User)
Company.hasMany(Department)
Company.hasMany(Project)

module.exports = Company