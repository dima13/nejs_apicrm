const express = require('express')
const sequelize = require('./utils/db')
const authRoutes = require('./routes/auth')
const companyRoutes = require('./routes/company')
const userRoutes = require('./routes/user')
const departmentRoutes = require('./routes/department')
const projectRoutes = require('./routes/project')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/user', userRoutes)
app.use('/api/department', departmentRoutes)
app.use('/api/project', projectRoutes)

async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT)
    } catch(e) {
        console.log(e)
    } 
} 
start()
