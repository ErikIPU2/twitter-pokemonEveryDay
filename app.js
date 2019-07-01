var app = require("./config/server");
var pokemonSorter = require("./pokemonSorter");
var twitter = require("./config/twitter");
var CronJob = require("cron").CronJob;

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;

var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, () => {
    console.log("App runing");
})

app.get("/", (req, res) => {
    pokemonSorter((pokemon) => {
        console.log(pokemon);
        
        tweet = `O Pokémon de hoje é o ${pokemon.name}

Nº Pokédex: ${pokemon.pokedexNumber}
Geração: ${pokemon.generation}
Tipo: ${pokemon.types.join(', ')}
Habilidades: ${pokemon.abilities.join(', ')}`;

        res.send(tweet)
    })
})



var job = new CronJob('38 22 * * * ', () => {
    pokemonSorter((pokemon) => {
        console.log(pokemon);
        
        tweet = `O Pokémon de hoje é o ${pokemon.name}

Nº Pokédex: ${pokemon.pokedexNumber}
Geração: ${pokemon.generation}
Tipo: ${pokemon.types.join(', ')}
Habilidades: ${pokemon.abilities.join(', ')}`;


        twitter.tweet(tweet, pokemon.images)
        console.log("hey!");
    });
}, () => {
    console.log("End");
},
true);