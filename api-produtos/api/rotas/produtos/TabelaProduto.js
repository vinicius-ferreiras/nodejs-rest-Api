const Modelo = require('./ModeloTabelaProduto')

module.exports = {
    listar(){
        return Modelo.findAll()
    }
}