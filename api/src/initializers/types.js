const { Type } = require('../db');
const axios = require('axios').default;


const initializeTypes = async () => {

    try {
        let types = [];
        let response = await axios.get(`https://pokeapi.co/api/v2/type`);
        response.data.results.forEach(res => {
            if(res.name){
                let cadena = res.name.split(", ");
                cadena.forEach((ty)=>{
                    types.push(ty)
                })
            }
            
        });
        types = new Set(types)
        types= [...types];
        await Promise.all(
            types.map(t => Type.findOrCreate({
                where: {name: t}
            }))
        )
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

module.exports = initializeTypes;