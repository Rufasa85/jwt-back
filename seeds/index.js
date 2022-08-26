const sequelize = require("../config/connection");
const {User,Icon,Pixel} = require("../models")

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

    const icons = [{
        name:"test icon",
        UserId:1
    },{
        name:"second icon",
        UserId:1
    },{
        name:"third icon",
        UserId:1
    },{
        name:"fourth icon",
        UserId:1
    }]
    icons.forEach(async icon=>{
        await Icon.create(icon)
    })
    const colors = ["#c0ffee","#dec0de","#bada55"]
    for (let i = 0; i < 16; i++) {
       for (let j = 0; j < 16; j++) {
        await Pixel.create({
            row:i,
            col:j,
            color:colors[Math.floor(Math.random()*colors.length)],
            IconId:1
        })
       }
        
    }
    process.exit(0)
}

seedMe()