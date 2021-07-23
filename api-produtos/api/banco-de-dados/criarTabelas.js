const ModeloTabela = require('../rotas/produtos/ModeloTabelaProduto')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada'))
    .catch(console.log)