Para executar a aplicação basta fazer o build do arquivo Dockerfile para criar a docker image através do comando "docker build ." e depois executar o comando "docker-compose up" para levantar os containers da aplicação e do banco de dados.

O método que busca piadas imprime uma piada no console sempre que for realizado um GET para /produtos/ sem informar um id de produto.

Os usuários para autenticação foram mockados no arquivo users.js, para autenticar basta fazer um POST para /token informando email e senha, será emitido o token JWT que deverá ser usado nos métodos POST, PUT e DELETE de /produtos.