const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_login')
const { UUID, UUIDV4, STRING } = Sequelize

const User = conn.define('user', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
    type:STRING,
    allowNull: false,
        validate: {
            notEmpty: true,
        }
    //unique: true
    },
    email: {
    type:STRING,
    allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        },
    unique: true
    },
    password: {
        type:STRING,
        allowNull: false,
            validate: {
                notEmpty: true
            }
    }
})

const syncAndSeed = async() => {
    await conn.sync({force:true})
    const users = [
        {name: 'Zach',email: 'zach@levine.com', password:'fake'},
        {name: 'Maria',email:'maria@lapshina.com', password: 'password'}
    ]
    await Promise.all(users.map(user => User.create(user)))
}
module.exports = {
    syncAndSeed, 
    models:{
        User
    }
}
