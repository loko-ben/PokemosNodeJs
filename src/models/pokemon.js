/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = ['Plante', 'Poisson', 'Feu', 'Eau', 'Fée', 'Electric', 'Insecte', 'Vol', 'Normal','Spectre']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        //NB: losrque tu ajoute une constrainte n'oublie pas de syndroniser la base de donnée pour que les nouvelles constrainte soit appliqué. 
        unique: {
          msg: 'Ce nom nom est deja pris. Veillez changer de nom!'
        },
        validate: {
          notEmpty: {msg: `Le champ name ne peux pas etre vide. Veillez le remplir.`},
          notNull : {msg: 'Le champ name ne peut pas etre Null. Veillez le remplir'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          isInt : {msg: 'Utilisez uniquement les nombres entier pour les points de vie.'},
          notNull: {msg: 'Les points de vie sont une proprieté requise'},
          max: {
            args: [999],
            msg: 'Validation error: les points de vie d\'un pokemon doivent etre inférieur ou égale a 999'
          },
          min: {
            args: [0],
            msg: 'Validation error: les points de vie d\'un pokemon doivent etre supérieur ou égale a 0' 
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'Le champ cp ne peut contenir que des nombre. Veillez remplir ce champ qu\'avec des nombres '},
          notNull: {msg:  'Le champ cp est  une proprieté requise  et ne peut pas etre null.'},
          max: {
            args: [999],
            msg: 'Validation error: les points de vie d\'un pokemon doivent etre inférieur ou égale a 999'
          },
          min: {
            args: [0],
            msg: 'Validation error: les points de vie d\'un pokemon doivent etre supérieur ou égale a 0' 
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          isUrl:{msg: 'Cette URL n\'est pas valide. Viellez entrer une URL valide.'},
          notNull: {msg :' Le champ pisture est d\'une proprieté require. Veillez la remplir.' }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue("types").split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        //Quand un utilisateur tente d'ajouter ou de modifier un Pokémon dans la base de données avec Sequelize, la validation est déclenchée automatiquement.
        validate: {
          isTypesValid(value){
            /*
            if (value)
              Cela vérifie si la variable value est "truthy". En JavaScript, une valeur est considérée comme truthy si elle n'est pas l'une des suivantes :
             false
             null
             undefined
             0
             NaN
             Une chaîne vide ""
             Autrement dit, si value contient une valeur (par exemple une chaîne ou un tableau), cette condition sera vraie.
            */
            if(!value){
              throw new Error('un Pokemon doit aumois avoir un type.') 
            }
            if(value.split(',').length > 3){
              throw new Error('Le pokemon ne peut pas avoir plus de trois types.')
            }
          value.split(',').forEach(type => {
            if (!validTypes.includes(type)){
              throw new Error(`Le ou les type(s) d\'un pokemon doit appartenir a la list suivante: ${validTypes}`)
            }
          });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }

/*
timestamps: true : timestamps a true c'est pour indiqué a sequelize que je modifier son comportement par defaut.
Personnalisation :
createdAt: 'created' : La colonne pour la date de création sera nommée created.
updatedAt: false : Désactive la colonne pour la date de mise à jour (updatedAt n'existera pas).


la methode define utilisé par l'instance de l''oject d'authentification de sequelize , nous de construire le model
que nous souhaitons et il prend en parametre trois parametres. 

*/

/**
 *Le getter personnalisé (get()) :
     get(){
      return this.getDataValue("types").split(',')
    },
this.getDataValue("types") :

Récupère la valeur brute du champ types dans la base de données (par exemple : "Plante,Poisson").
.split(',') :

Convertit cette chaîne en tableau en séparant les éléments par la virgule.
Exemple :
Dans la base : "Plante,Poisson"
En JavaScript : ["Plante", "Poisson"]
But :

Permet à l'application de manipuler ce champ sous forme de tableau, même si la base stocke une chaîne.
 */

/**
 Le setter personnalisé (set(types)) :

Modifier
    set(types){
      this.setDataValue('types', types.join())
    }
types :

Représente la valeur que tu veux attribuer à ce champ (souvent un tableau, comme ["Plante", "Poisson"]).
.join() :

Transforme le tableau en une chaîne de caractères en utilisant une virgule comme séparateur.
Exemple :
Si l'entrée est ["Plante", "Poisson"], elle devient "Plante,Poisson".
this.setDataValue('types', ...) :

Stocke la version modifiée (sous forme de chaîne) dans le champ types de la base.

 */