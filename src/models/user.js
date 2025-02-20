const { Sequelize, STRING } = require("sequelize");

/* Authentification : Créer un modele User avec Sequelize */
/*lorsqu'on crée un modele avec sequilize, ce dernier va se chargé d'ajouter 's' a la fin de nom du modele*/
module.exports = (sequelize, DataTypes ) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        username: {
            type: DataTypes.STRING,
            unique: { msg:'Le nom est deja pris'}
        },
        password: {
            type: DataTypes.STRING
        }
    })
}