let pokemons = [
    {
        id: 1,
        name: "Tiplouf",
        hp: 19,
        cp: 5,
        picture: "https://pngimg.com/uploads/pokemon/pokemon_PNG86.png",
        types: ["Vol,Eau"],
        created: new Date()
    },
    {
        id: 2,
        name: "Brindibou",
        hp: 12,
        cp: 59,
        picture: "https://www.pokemontrash.com/pokedex/images/sugimori/722.png",
        types: ["Plante,Vol"],
        created: new Date()
    },
    {
        id: 3,
        name: "Effleche",
        hp: 62,
        cp: 5,
        picture: "https://www.pokemontrash.com/pokedex/images/sugimori/723.png",
        types: ["Plante,Vol"],
        created: new Date()
    },
    {
        id: 4,
        name: "Archéduc",
        hp: 9,
        cp: 2,
        picture: "https://www.pokemontrash.com/pokedex/images/sugimori/724.png",
        types: ["Plante,Spectre"],
        created: new Date()
    },
    {
        id: 5,
        name: "Matoufeu",
        hp: 17,
        cp: 2,
        picture: "https://www.pokemontrash.com/pokedex/images/sugimori/726.png",
        types: ["Feu"],
        created: new Date()
    },
    {
        id: 6,
        name: "Flamiaou",
        hp: 9,
        cp: 2,
        picture: "https://www.pokemontrash.com/pokedex/images/sugimori/725.png",
        types: ["Feu"],
        created: new Date()
    },
    {
        id: 7,
        name: "Otaquin",
        hp: 9,
        cp: 2,
        picture: "https://www.pokemontrash.com/pokedex/images/sugimori/728.png",
        types: ["Eau"],
        created: new Date()
    },
    {
        id: 8,
        name: "Oratoria",
        hp: 9,
        cp: 2,
        picture: "https://www.pokemontrash.com/pokedex/images/sugimori/730.png",
        types: ["Eau,Fée"],
        created: new Date()
    },

    {
        id: 9,
        name: "Piclairon",
        hp: 9,
        cp: 2,
        picture: "https://www.pokemontrash.com/pokedex/images/sugimori/732.png",
        types: ["Normal,Vol"],
        created: new Date()
    },
    {
        id: 10,
        name: "Cablifere",
        hp: 9,
        cp: 2,
        picture: "https://www.pokemontrash.com/pokedex/images/sugimori/796.png",
        types: ["Electric"],
        created: new Date()
    },
   
]
    
//j'expose ma constante pokemons dans toute mon application , ainsi je porrait l'utiliser dans toute mon application
module.exports = pokemons;