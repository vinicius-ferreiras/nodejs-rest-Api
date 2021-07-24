const roteador = require('express').Router()
const TabelaProduto = require('./TabelaProduto')
const Produto = require('./Produto')

roteador.get('/produtos/', async (requisicao, resposta) => {
    const resultados = await TabelaProduto.listar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.get('/produtos/:idProduto', async (requisicao, resposta) => {
    try{
        const id = requisicao.params.idProduto
        const produto = new Produto({id : id})
        await produto.carregar()
        resposta.status(200)
        resposta.send(
            JSON.stringify(produto)
        )
    } catch (erro) {
        resposta.status(404)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.post('/produtos/', async (requisicao, resposta) => {
    try {
    const dadosRecebidos = requisicao.body
    const produto = new Produto(dadosRecebidos)
    await produto.criar()
    resposta.status(201)
    resposta.send(
        JSON.stringify(produto)
    )
    } catch (erro) {
        resposta.status(400)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.put('/produtos/:idProduto', async (requisicao, resposta) => {
    try{
        const id = requisicao.params.idProduto
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const produto = new Produto(dados)
        await produto.atualizar()
        resposta.status(204)
        resposta.end()
    } catch(erro){
        resposta.status(400)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.delete('/produtos/:idProduto', async (requisicao, resposta) => {
    try {
    const id = requisicao.params.idProduto
    const produto = new Produto({id : id})
    await produto.carregar()
    await produto.remover()
    resposta.status(204)
    resposta.end()
    } catch (erro) {
        resposta.status(404)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador