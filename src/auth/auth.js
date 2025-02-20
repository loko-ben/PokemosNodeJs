const jwt = require ('jsonwebtoken')
const private_key = require('../auth/private_key')

module.exports = (req,res, next) => {
    //Si l'en-tête Authorization est absent, authorizationHeader sera undefined.
    const authorizationHeader = req.headers.authorization

    //vérification si la proprieté authorizationHeader n'est pas une valeur "falsy(explication : Si lors de récupération  )"
    if (!authorizationHeader){
        const message = `Vous n'avez pas fourni de jeton d'authenfication. Ajoutez-en un dans l'en-tête de la requête`
        return res.status(401).json({message})
    }

    // recupération tu jeton jwt 
    // voici un exemple de comment se presente l'en-tete authorization qui contient le jetons jwt donc
    //  nous avons besoin:  example => authorization: Bearer  FdE98ADEbdyDBm8u
    // l'idé ici est d'xtraire le jetons jwt de l'en-tete authorization qui est 'FdE98ADEbdyDBm8u' 
    const token= authorizationHeader.split(' ')[1]

    /*
    *jwt.verify() est une méthode de la bibliothèque jsonwebtoken qui permet de vérifier la validité d'un JWT.
    *token représente le JWT reçu, généralement transmis dans les headers de la requête.
    *private_key est la clé secrète utilisée pour signer et vérifier le token.
    *La fonction de callback est exécutée une fois la vérification terminée.
       Si le token est invalide ou expiré, l'erreur est retournée (error).
       Sinon, les données contenues dans le token sont stockées dans decodedToken.
       
    ===================================================================================================================================
    
    🔹 Étape 1 : Vérification du token
       Lorsque jwt.verify(token, private_key, callback) est exécuté :

     La signature du token est comparée avec private_key pour s'assurer qu'il n'a pas été falsifié.
     La date d'expiration (exp dans le token) est vérifiée.
     Si le token a été modifié ou a expiré, une erreur est générée.


     🔹 Étape 2 : Exécution du callback
        Une fois la vérification faite, la fonction callback reçoit :

        error → Si le token est invalide ou expiré.
        decodedToken → Un objet contenant les données encodées dans le JWT, par exemple :
       */


    const decodedToken = jwt.verify(token, private_key, (error, decodedToken) => {
        if(error){
            const message = `L'utilisateur n'est pas autorisé a acceder a cette ressource. ` 
            return res.status(401).json({message, data: error})                   
        }

        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            const message = `L'identifiant de l'utilisateur est invalide.`
            res.status(401).json({message})
        }else{
            next()
        }
    })
}