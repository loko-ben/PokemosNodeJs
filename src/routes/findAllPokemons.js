const { where } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons', auth,  (req, res) => {
   
    if(req.query.name){
      //Réccupération du parametre de requeste name(j'ai bein dit le parametre de requeste et non parametre d'url )
      const name = req.query.name
      //Ce code est une instruction JavaScript souvent utilisée dans une application Node.js avec Express pour récupérer un paramètre de requête (query parameter) et lui attribuer une valeur par défaut si celui-ci est absent ou invalide.
      const limit = parseInt(req.query.limit) || 5
     
     if(name.trim().length <2){
      const message = 'le terme de recherche doit contenir aumoins 2 caracteres'
      res.status(400).json({message})
     }else{
      return Pokemon.findAndCountAll({
        where: {
          name: {//name est une propriete du model pokemon
            //Grace au l'option .like , sequelize va ignoré la case.
            //Explication du role du pourcentage : 
            // On recherche un pokemon qui commence par le terme de recherche.
            // ${name}%

            // On recherche un pokemon qui SE TERMINE  par le terme de recherche.
            // %${name}

             // On recherche un pokemon qui contien le terme de recherche.
            // %${name}%

            [Op.like]: `%${name}%` //'name' est le critere de la recherche.
            },
        },
        order: ['name'],
        limit: limit
      }
      )
      .then(({count, rows}) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}`
        res.json({message, data: rows})
      })
     }
      
    }else{
      Pokemon.findAll({ order: ['name'] })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error =>{
        const message = 'la liste de pokemon n\'a pu etre recupérer ! Veillez ressayer plutart.'
        res.status(500).json({message, data: error})
        console.log('la liste de pokemon n\'a pu etre recupérer a cause de : ', error)
      }
      )
    }
  }) 
}

// 500 Internal Server Error : Une erreur générique côté serveur.

/*
.then(pokemon => {
        if(pokemon.length === 0){
          const message = `Il y a aucun pokemons  correspondant au terme de recherche ${name}`
          res.status(404).json({message})
        }else if(pokemon.length > 0){
          const message = `Il y a ${pokemon.length} pokemons qui correspondent au terme de recherche ${name}`
          res.json({message, data: pokemon})
        }
      })
*/