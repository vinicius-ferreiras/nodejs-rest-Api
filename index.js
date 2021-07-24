const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./controllers/produtos')
const health = require('./controllers/health')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use(bodyParser.json())

app.use('/api', roteador)

app.use('/health', health)

app.listen(config.get('api.porta'), () => {
    console.log('API funcionando')
})

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
