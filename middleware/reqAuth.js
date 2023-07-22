const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')

const requireAuth = async (req, res, next) =>{
     const { authorization } = req.headers

     if(!authorization){
        return res.status(401).json({error:"Forbiden, You need to create an account or login first!"})
     }

     const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error:'FORBIDEN'})
    }
}

module.exports =  requireAuth