var request = require("request");

// var maxPokemon = 825;
// TODO:
var maxPokemon = 500;

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

var pokemonSorter = {

    requestPokemon: function(pokeId, callback) {
        request(API_URL + pokeId, (error, res, content) => {
            json = JSON.parse(content);
            callback(json);
        })
    },

    calculeGeneration: function(pokeId) {
        if (pokeId >= 1 && pokeId <= 151) {
            return 1
        } else if (pokeId >= 152 && pokeId <= 251) {
            return 2
        } else if (pokeId >= 252 && pokeId <= 386) {
            return 3
        } else if (pokeId >= 387 && pokeId <= 493) {
            return 4
        } else if (pokeId >= 494 && pokeId <= 649) {
            return 5
        } else if (pokeId >= 650 && pokeId <= 721) {
            return 6
        } else {
            return 7
        }
    },

    getRandomPokemon: function(callback) {
        let pokeId = Math.floor(Math.random() * (maxPokemon+1)) + 1;
        console.log(pokeId);
        pokemonSorter.requestPokemon(pokeId, (pokemon) => {
            let utilInfo = {
                name: pokemon.name,
                pokedexNumber: pokeId,
                images: [
                    pokemon.sprites.front_default,
                    pokemon.sprites.back_default
                ],
                generation: pokemonSorter.calculeGeneration(pokeId),
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types.map((type) => {
                    return type.type.name
                }),
                abilities: pokemon.abilities.map((ability) => {
                    return ability.ability.name;
                })

            }
            callback(utilInfo)
        })
    }

}

module.exports = pokemonSorter.getRandomPokemon