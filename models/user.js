const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const Project = require('../models/project')
const ProjectUsers = require('../models/project-users')

const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Некорректный email'
            }
        }
    }
}, {
    tableName: 'shevtsov_users'
})

User.belongsToMany(Project, {through: ProjectUsers})
module.exports = User