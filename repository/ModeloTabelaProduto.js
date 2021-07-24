const Sequelize = require('sequelize')
const instancia = require('.')

const colunas = {
    produto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    criadoPor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alteradoPor: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'produtos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao'
}

module.exports = instancia.define('produto', colunas, opcoes)