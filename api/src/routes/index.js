const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemon = require('./pokemons'); 
const type = require('./types');

const router = Router();

router.use('/pokemons', pokemon);
router.use('/type', type);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
