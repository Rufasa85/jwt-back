const express = require('express');
const router = express.Router();
const {Icon,Pixel} = require('../models');

router.get("/recent",(req,res)=>{
    Icon.findAll({
        order:[["createdAt","DESC"]],
        limit:3,
        include:[Pixel]
    }).then(data=>{
        res.json(data)
    })
})

module.exports = router;