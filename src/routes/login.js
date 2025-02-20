/* Authentificateur : Créer un modele User avec Sequelize*/
const {user} = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const primateKey = require('../auth/private_key')


/*
 *User.findOne({where: {username: req.body.username}}) :
    Recherche dans la base de données un utilisateur dont le username correspond à celui fourni par l’utilisateur (req.body.username).

 *bcrypt.compare(req.body.password, user.password):
    Ce code compare le mot de passe entré par l’utilisateur (req.body.password) avec le mot de passe haché stocké dans la base de données (user.password).   
    La fonction bcrypt retourne la valeur true lorsque les mot de passe sont identique et false lorsque les mot de passe sont differents.

 *NB: La methode .compare retourne bien une promesse car de la meme maniere que bcrypt prend du temp pour critée le mot de passe qui a été enregistré dans la base de donnée, il prend également du temps pour decrytée le mot de passe de l'utilisateur trouvé(user.password) enfin de le comparer au mot de passe en clair envoyé par l'utilisateur qui tente de se connecté(req.body.password. Et puis-que c'est une opération asynchrone il retourne bien une promese.  
 
*/

module.exports = (app) => { 
    app.post('/api/login', (req, res) =>{
        user.findOne({where: {username: req.body.username}})
        .then(user=>{
            //NB: cette fonction .findOne retourne true SI L'UTILISATEUR est truvé et false dans le cas contraire. 
            if(!user){
                const message = 'L\'utilisateur demandé n\'existe pas.'
                res.status(404).json({message})
            }else{
                bcrypt.compare(req.body.password, user.password).then(isPasswordValid =>{
                    if(!isPasswordValid){
                        const message = `le mot de passe est incorrect`
                        return res.status(401).json({message})
                    }else{
                        //jwt
                        const token = jwt.sign(
                            {userId: user.id}, 
                            primateKey,
                            {expiresIn: '24h'}
                        )
                        const message = `L'utilisateur  a été connecté avec succes`;
                        return res.json({message, data: user, token})
                    }
                })
            }
            
        }).catch(error => {
            //ce cas correspond au cas d'un appel reseaux qui échouerait.
            //NB: tout appel a la bd peut soulevé une erreur, alors si cela arrive nous capturons l'erreur.
            const message  = `L'utilisateur n'a pas pu etre connecté. Ressayer dans quelque instants.`
            return res.json({message, data: error})
        })
    })
}