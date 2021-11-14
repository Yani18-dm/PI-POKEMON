const server = require('express').Router();
const { Pokemon, Tipo, Op} = require('../db');





server.get('/', async function(req, res, next){
    try {
        let { page } = req.query;
        if(!page) page = 1; 
        const paginado = 10; 
        const dbPokemons = await Pokemon.findAll({include: {model: Tipo}})
        res.status(200).json(dbPokemons,slice(paginado * (page - 1), (paginado * (page - 1)) + paginado));
        
    } catch (error) {
        console.log(error)
    }

});

server.get('/id/:id', async function(req, res, next){
    try {
        const { id } = req.params;
        let pokemon; 
        if(isNaN(id)){
            pokemon = await Pokemon.findOne({
                where: {
                    id: id
                }, include: {
                    model:Tipo
                }
            });
        }
        res.send(pokemon ? pokemon : "No hay Pokemon")
        
    } catch (error) {
        next(error)
    }
});



server.get("/searchPokemon", async function(req, res, next){
    try{
        const { name } = req.query
        let result = [];
        let dbPoke = await Pokemon.findAll({ 
            where:{
                name:{
                    [Op.iLike]:`%${name}%`
                }
            },
            include: {model: Tipo}
        })
        if(dbPoke && dbPoke.length) result = result.concat(dbPokemons)
        return res.json(result)
       
    }catch(error){
        next(error)
    }
});

server.post("/add", function(req, res, next){
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso } = req.body;
    if (!nombre || !vida || !fuerza || !defensa || !velocidad || !altura || !peso){
        return res.status(422).json({error: "No se enviaron todos los datos"})
    }
    Pokemon.create({
        nombre: nombre,
        vida: vida,
        fuerza: fuerza,
        defensa: defensa,
        velocidad: velocidad,
        altura: altura,
        peso: peso,
    })
    .then(pokemon => {
        pokemon.addTypes(type)
        .then(async ()=>{
            pokemon.type = await pokemon.getTypes()
            console.log(pokemon.type)
            res.json({
                nombre: pokemon.nombre,
                vida: pokemon.vida,
                fuerza: pokemon.fuerza,
                defensa: pokemon.defensa,
                velocidad: pokemon.velocidad,
                altura: pokemon.altura,
                peso: pokemon.peso
            })
        })
    }).catch(next)
});


module.exports = server;