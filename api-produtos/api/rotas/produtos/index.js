const roteador = require('express').Router()
const ModeloTabela = require('./ModeloTabelaProduto')
const TabelaProduto = require('./TabelaProduto')

roteador.use('/', async (requisicao, resposta) => {
    const resultados = await TabelaProduto.listar()
    resposta.send(
        JSON.stringify(resultados)
    )
})

module.exports = roteador