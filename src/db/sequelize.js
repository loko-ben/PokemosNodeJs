/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('../db/pokemons.js')
const UserModel = require('../models/user.js')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const user = UserModel(sequelize, DataTypes)
/**
pokemons.map(...)
pokemons est un tableau d'objets contenant des informations sur des Pokémon.
.map() est une méthode qui parcourt chaque élément du tableau et applique une fonction à chacun d’eux.
 */ 
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

/**
 * Nous essayons ici d'encryter le mot de passe de l'utilisateur, et pour se faire sequelize met a notre disposition
 * un module nommé 'bcrypt' qui va nous permettre de hasher le mot de passe et de renvoyé un mot de passe entierement
 * cryté ce qui garantira la confidencialité et la securité de notre bd (et des infos de l'utilisateur). 
 * 
 * bcrypt.hash('dalinlemalin', 10)
 * 'dalinlemalin' represente le mot de passe de l'utilisateur en dure et '10' represente le temps de hashage ou
 * encore de temps crytage du mot de passe envoyé par l'utilisateur et plus ce temps est élévé plus le mot de passe
 * cryté sera difficile a décryté pour un pirate, mais cele prend également plus de ressource.
 * NB: n'oublie pas de pa ssé le mot de passe cryté a la bd et non le mot de passe de brute de l'utilisateur.
 */
    bcrypt.hash('dalinlemalin', 10)
    .then(hash =>{
      user.create({
        username: 'Tchuisseu',
        password: hash
      }).then(user  => console.log(user.toJSON()))
    }
    )
    

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, user
}