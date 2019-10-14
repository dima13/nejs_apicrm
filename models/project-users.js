const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const ProjectUsers = sequelize.define("ProjectUsers", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'shevtsov_project_users'
})

module.exports = ProjectUsers