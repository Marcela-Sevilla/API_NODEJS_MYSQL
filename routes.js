const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    res.send('Testing API')
})

module.exports = routes