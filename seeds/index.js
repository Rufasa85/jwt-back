const sequelize = require("../config/connection");
const {User} = require("../models")

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    await User.bulkCreate([
        {
            email:"joe@joe.joe",
            password:"password"
        },
        {
            email:"axel@joe.joe",
            password:"password1"
        },
        {
            email:"guy@joe.joe",
            password:"flavortown"
        }

    ],{
        individualHooks:true
    })
    process.exit(0)
}

seedMe()