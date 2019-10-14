const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const Project = sequelize.define("Project", {
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
    tableName: 'shevtsov_projects'
})

//Project.belongsToMany(User, {through: ProjectUsers})
module.exports = Project