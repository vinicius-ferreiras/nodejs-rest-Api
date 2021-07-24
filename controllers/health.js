const express = require('express')
const health = express()

health.get('/', (requisicao, resposta) => {
    resposta.status(200)
    resposta.send(
        '{status: up}'
    )
})

module.exports = health