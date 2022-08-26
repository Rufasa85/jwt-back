const express = require('express');
const router = express.Router();
const {Icon,Pixel} = require('../models');
const jwt = require("jsonwebtoken")

router.get("/recent",(req,res)=>{
    Icon.findAll({
        include:[{
            model:Pixel,
        }],
        order:[["createdAt","DESC"],[Pixel,"row"],[Pixel,"col"]],
        limit:3,
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"an error occurred",err})
    })
})

router.post("/", async (req,res)=>{
    // console.log(req.body);
    const token = req.headers.authorization.split(" ")[1]
    try{
        const userData = jwt.verify(token,process.env.JWT_SECRET)
        // res.json(userData)
    const newIcon = await Icon.create({
        name:req.body.name,
        UserId:userData.id
    })
    console.log(newIcon)
    const pixCopy = [...req.body.pixels];
   const pixelObjs= [];
   for(i=0;i<16;i++){
    for(j=0;j<16;j++){
        pixelObjs.push({
            row:i,
            col:j,
            color:pixCopy.shift(),
            IconId:newIcon.id
        })
    }
   }

   console.log(pixelObjs)
   await Pixel.bulkCreate(pixelObjs)
   res.json({msg:"new icon created!"})
}catch{
    res.status(403).json({msg:"invalid token"})
  }
})

module.exports = router;