const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./rotas/produtos/index.js']

swaggerAutogen(outputFile, endpointsFiles)
