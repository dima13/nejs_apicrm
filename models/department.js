const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const User = require('../models/user')

const Department = sequelize.define("Department", {
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
    tableName: 'shevtsov_departments'
})

Department.hasMany(User)
User.belongsTo(Department)

module.exports = Department