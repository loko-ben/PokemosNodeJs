const  express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const sequilize = require('./src/db/sequelize.js')
const { Console } = require('console')

const app = express() 
//const port = process.env.PORT  || 3000 
const port =  3000 

// const findAllPokemons = require('./src/routes/findAllPokemons.js')
// findAllPokemons(app)
app
  .use(favicon(path.join(__dirname, 'favicon.ico')))
  //bodyParser.json() : Un middleware pour analyser (parser) les données au format JSON envoyées dans le corps des requêtes HTTP.
  .use(bodyParser.json())

sequilize.initDb()

//NB: Bonnes pratique en programmation: -un EndPoint toujour etre écrit en minuscule,
//                                      -si l'entité(le model) possede un nom composé alors utilisons des "_"

//app.get('/',(req,res)=>{
  //res.json('Hello Heroku')
//})

app.get('/', (req, res) =>{
  res.json('Hello Heroku ')
} )
//Ici nous placerons nos future points de terminaison
require('./src/routes/findAllPokemons.js')(app)
require('./src/routes/findPokemonByPk.js')(app)
require('./src/routes/createPokemon.js')(app)
require('./src/routes/updatePokemon.js')(app)
require('./src/routes/deletePokemon.js')(app)
require('./src/routes/login.js')(app)    
require('./src/routes/user.js')(app)


app.use(({res})  => {
  const message = 'Impossible de trouvé la ressource demandée! Vous pouvez essazer une autre URL'
  res.status(404).json({message})
})
//Ici seras nos futur point de terminaison

//NB: npm nodemon app.js permet de reinicialiser toute les valeurs des ressources a leur valeurs de depart , il est differant de npm run nodemon app.js .
app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}` ) )