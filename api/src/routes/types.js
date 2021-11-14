const server = require('express').Router();
const { Type } = require('../db');

server.get('/', async function(req, res, next){
    try{
        res.status(200).json(await Type.findAll())
    }catch(error){
        next(error)
    }
})
 
module.exports = server;