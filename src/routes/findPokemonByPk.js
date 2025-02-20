const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', auth,  (req, res) => {
    //bien req.params.id retourne une chaine de caractere,il n'est pas néccessaire de le convertir en entier car la methode findByPk() se charge de convertir la chaine de caractere en entier.
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
          const message = 'Le pokémon n\'existe pas essayé avec un autre identifiant.'
          res.status(404).json({message, data: erro})
        }else{
          const message = 'Un pokémon a bien été trouvé.'
          res.json({ message, data: pokemon })
        }
      })
      .catch(error=> {
        const message = 'le pokemon n\'a pas pu etre récupérer! Veillez ressayer plutart.'
        res.status(500).json({message, data: error})
      })
  })
}