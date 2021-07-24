const { default: axios } = require('axios')
const Modelo = require('./ModeloTabelaProduto')

module.exports = {
    listar(){
        return Modelo.findAll()
    },

    inserir(produto) {
        return Modelo.create(produto)
    },

    async buscarPorId(id){
        const produtoEncontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if(!produtoEncontrado){
            throw new Error('Produto não encontrado')
        }
        return produtoEncontrado
    },
    atualizar(id, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: {id: id}
            }
        )
    },
    remover(id){
        return Modelo.destroy({
            where: {id: id}
        })
    },

    async buscarPiada(){
        const piada = await axios.get('https://api.chucknorris.io/jokes/random')
        const valor = piada.data.value
        return valor
    }
}