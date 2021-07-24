const TabelaProduto = require('../repository/TabelaProduto')

class Produto {
    constructor ({id, produto, descricao, preco, criadoPor, alteradoPor, dataCriacao, dataAtualizacao}) {
        this.id = id
        this.produto = produto
        this.descricao = descricao
        this.preco = preco
        this.criadoPor = criadoPor
        this.alteradoPor = alteradoPor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
    }

    async criar() {
        this.validar()
        const resultado = await TabelaProduto.inserir({
            produto: this.produto,
            descricao: this.descricao,
            preco: this.preco,
            criadoPor: this.criadoPor,
            alteradoPor: this.alteradoPor
        })
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
    }

    async carregar(){
        const produtoEncontrado = await TabelaProduto.buscarPorId(this.id)
        this.produto = produtoEncontrado.produto
        this.descricao = produtoEncontrado.descricao
        this.preco = produtoEncontrado.preco
        this.criadoPor = produtoEncontrado.criadoPor
        this.dataCriacao = produtoEncontrado.dataCriacao
        this.alteradoPor = produtoEncontrado.alteradoPor
        this.dataAtualizacao = produtoEncontrado.dataAtualizacao
    }

    async atualizar(){
        await TabelaProduto.buscarPorId(this.id)
        const campos = ['produto', 'descricao', 'preco', 'alteradoPor']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0){
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0){
            throw new Error('Favor, informar dados válidos')
        }

        await TabelaProduto.atualizar(this.id, dadosParaAtualizar)
    }

    remover(){
        return TabelaProduto.remover(this.id)

    }

    validar(){
        const campos = ['produto', 'descricao', 'preco', 'criadoPor']
        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor !== 'string' || valor.length === 0){
                throw new Error(`O campo '${campo}' está invalido`)
            }
        })
    }
}

module.exports = Produto