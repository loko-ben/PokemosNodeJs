//const User = require('../models/user')
const user = require('../db/sequelize')
const {ValidationError ,UniqueConstraintError} = require('sequelize')
const bcryptjs = require('bcryptjs')

module.exports = (app) => {
    app.post('api/users',(res, req)=>{ 
        bcryptjs.hash(req.body.password, 10)
            .then(hash =>{
              user.create({
                username: req.body.username,
                password: hash
              }).then(user  => console.log(user.toJSON()))
            }
            ).catch(error=> {
                if(error instanceof UniqueConstraintError){
                    return res.status(400).json({messsage: error.message})
                }
            
                const message = 'le user n\'a pas pu etre ajouté! Veillez ressayer plutart.'
                res.status(500).json({message, data: error})
            })
      
    } )
}

