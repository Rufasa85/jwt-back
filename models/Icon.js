const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Icon extends Model {}

Icon.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    }
},{
    sequelize
});

module.exports=Icon