const { Pokemon, Tipo } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const initializePokemons = async () => {
    try {
        let pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon'); 
        
        pokemons = pokemons.data.results.forEach(async p => {
            const pokemon = {
                id: uuidv4(),
                name: p.name,
                // life: p.stats[0].base_stat,
                // strong: p.stats[1].base_stat,
                // defense: p.stats[2].base_stat,
                // speed: p.stats[5].base_stat,
                // height: p.height,
                // weight: p.weight,
            }
            let types = [];
            if(p.type){
                const tipos = p.type.split(", ")

                for(const type of tipos){
                    const tipo = await Tipo.findOne({
                        where:{name: type}
                    })

                    types.push(tipo);
                }
            }
            
            const createPokemon = await Pokemon.create(pokemon)

            await createPokemon.addTypes(types)
        });
    } catch (error) {
        console.log(error)        
    }
}

module.exports= initializePokemons;