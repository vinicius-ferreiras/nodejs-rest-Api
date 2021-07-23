const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/produtos')

app.use(bodyParser.json())

app.use('/api/produtos' , roteador)


app.listen(config.get('api.porta'), () => {
    console.log('API funcionando')
})
