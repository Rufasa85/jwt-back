const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {}

User.init({
    // add properites here, ex:
    email: {
         type: DataTypes.STRING,
         unique:true 
    },
    password:{
        type:DataTypes.STRING,
        validate:{
            len:[8]
        }
    }
},{
    sequelize,
    hooks:{
        beforeCreate:function(newUser){
            newUser.password = bcrypt.hashSync(newUser.password,4);
            return newUser
        }
    }
});

module.exports=User