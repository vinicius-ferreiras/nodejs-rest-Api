const roteador = require('express').Router()
const TabelaProduto = require('../repository/TabelaProduto')
const Produto = require('../model/Produto')
const { default: axios } = require('axios')
var jwt = require("jwt-simple")
var auth = require("../auth")()
var users = require("../users")
var cfg = require("../config")

roteador.use(auth.initialize())

roteador.get('/produtos/', async (requisicao, resposta) => {
    const resultados = await TabelaProduto.listar()
    const joker = await TabelaProduto.buscarPiada()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
    console.log(joker)
})

roteador.get('/produtos/:idProduto', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idProduto
        const produto = new Produto({ id: id })
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

roteador.post('/produtos/', auth.authenticate(), async (requisicao, resposta) => {
    try {
        const dadosRecebidos = requisicao.body
        const produto = new Produto(dadosRecebidos)
        await produto.criar()
        resposta.status(201).json(produto)
    } catch (erro) {
        resposta.status(400)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.put('/produtos/:idProduto', auth.authenticate(), async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idProduto
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const produto = new Produto(dados)
        await produto.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        resposta.status(400)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.delete('/produtos/:idProduto', auth.authenticate(), async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idProduto
        const produto = new Produto({ id: id })
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

roteador.post("/token", function (req, res) {
    if (req.body.email && req.body.password) {
        var email = req.body.email
        var password = req.body.password
        var user = users.find(function (u) {
            return u.email === email && u.password === password
        })
        if (user) {
            var payload = { id: user.id }
            var token = jwt.encode(payload, cfg.jwtSecret)
            res.json({ token: token })
            return
        } else {
            res.Status(401)
        }
    } else {
        res.Status(401)
    }
})

module.exports = roteador