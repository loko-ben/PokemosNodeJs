const { Pokemon } = require('../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../auth/auth')
 

module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    }) 
    .then(_ => {
      Pokemon.findByPk(id).then(pokemon => {
        console.log(pokemon)
        if(pokemon === null){
          const message = 'Le pokémon n\'existe pas essayé avec un autre identifiant.'
          res.status(404).json({message})
        //res.status(404).json({message, data: error})
        }else{
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`
          res.json({ message, data: pokemon })
        }
        
      })
      .catch(error=> {
        const message = 'le pokemon a été  modifier, mais la lecture de ce pokemon a échoué ! Veillez ressayer plutart.'
        res.status(500).json({message, data: error})
      })
    })
    .catch(error=> {
      

      if(error instanceof ValidationError){
        return res.status(400).json({message: error.message, data: error})
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({messsage: error.message})
      }
      const message = 'le pokemon n\'a pas pu etre modifier! Veillez ressayer plutart.'
      res.status(500).json({message, data: error})
      console.log("l'update du pokemon a echoué a cause de :" , error)
    })
    
  })
}
