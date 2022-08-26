const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User, Icon,Pixel} = require("../models")
const jwt = require("jsonwebtoken")

router.post("/signup",(req,res)=>{
    User.create(req.body).then(newUser=>{
        const token = jwt.sign({
            id:newUser.id,
            email:newUser.email
         },process.env.JWT_SECRET,{
             expiresIn:"2h"
         })
         return res.json({
             token:token,
             user:newUser
         })
    }).catch(err=>{
        res.status(500).json({msg:"an error occurred",err})
    })
})

router.post("/login",(req,res)=>[
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid login credentials!"})
        }
        else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login credentials!"})
        } else {
            const token = jwt.sign({
               id:foundUser.id,
               email:foundUser.email
            },process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            return res.json({
                token:token,
                user:foundUser
            })
        }
    }).catch(err=>{
        res.status(500).json({msg:"an error occurred",err})
    })
])
router.get("/check-token",(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    try{
        const userData = jwt.verify(token,process.env.JWT_SECRET)
        res.json(userData)
    } catch{
      res.status(403).json({msg:"invalid token"})
    }
})
router.get("/user-from-token",(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    try{
        const userData = jwt.verify(token,process.env.JWT_SECRET)
        User.findByPk(userData.id,{
            include:[{
                model:Icon,
                include:[Pixel],
               
            }]
        }).then(userData=>{
            res.json(userData)
        }).catch(err=>{
            res.status(500).json({msg:"an error occurred",err})
        })
    } catch{
      res.status(403).json({msg:"invalid token"})
    }
})
router.get("/:id",(req,res)=>{
        User.findByPk(req.params.id,{
            include:[{
                model:Icon,
                include:[Pixel],
            }],
            // order:[[Icon,"createdAt","DESC"],["Icon.Pixel","row"],["Icon.Pixel","col"]],
        }).then(userData=>{
            const newIcons = userData.Icons.map(icon=>{
                icon.Pixels.sort((a,b)=>{
                    if(a.row<b.row) {
                        return -1
                    } else if(a.row>b.row) {
                        return 1
                    } else {
                        if(a.col<b.col){
                            return -1
                        } else {
                            return 1
                        }
                    }
                })
                return icon
            })
            // res.json(newIcons[0].Pixels)
            res.json({
                email:userData.email,
                Icons:newIcons
            })
       })
    })

module.exports = router;