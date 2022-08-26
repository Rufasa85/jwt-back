const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pixel extends Model {}

Pixel.init({
    // add properites here, ex:
    row: {
         type: DataTypes.INTEGER
    },
    col: {
         type: DataTypes.INTEGER
    },
    color:{
        type:DataTypes.STRING,
        defaultValue:"#ffffff"
    }
},{
    sequelize
});

module.exports=Pixel