# IMERSÃO PRÁTICA - INHALT
Projeto realizado para teste de seleção da Inhalt Soluções em Informática para a vaga de desenvolvedor!

## Requisitos
- Realizar login;
- Listar os produtos cadastrado com um filtro;
- Cadastrar novos produtos com nome, valor e quantidade em estoque;
- Realizar uma venda, o qual consiste em selecionar o produto e a quantidade vendida;
- Deve ser possível emitir um relatório para ser visualizado os itens vendidos com totalização;
- Possibilidade de criar novos usuários para gerenciar o sistema;

Obs: Não deve ser possível vender produtos que tenha zero no estoque.

## Tecnologias

##### FrontEnd
- ReactJS

##### Api
- Asp.NET Core

##### Banco de dados
- InMemory

## Introdução

O sistema foi feito em ReactJS e Asp.NET Core sem o uso de um banco de dados relacional ou não relacional. Foi optado para uso de um banco de dados em memória, o próprio InMemory do Entity Framework, pela facilidade dele para prototipação de um projeto e por se aproximar de uma conexão com outros tipos de bancos de dados, assim podendo facilmente substituído por um banco SQL.

Iniciando a aplicação

API
Tendo o DOTNET SDK instalado na máquina, abra o terminal na pasta e digite o seguinte comando: `dotnet run`.

FRONT-END
Tendo o NodeJs instalado na máquina, abra o terminal na pasta e digite o seguinte comando `npm i` ou `yarn` para atualizar as dependências e `npm start` ou `yarn start` para iniciar a aplicação.

BANCO DE DADOS
Tendo o banco de dados MySQL basta importar o arquivo `inhalt_teste.sql`, assim importara toda a base de dados.

## Comentarios de desenvolvimento

##### API
Foram desenvolvidos na API os requisitos solicitados, com exceção da emissão do relatório para visualização dos itens vendidos com totalização.

No geral, a expectativa para o desenvolvimento da API não era tão boa, por não ter experiência no desenvolvimento com ASP.NET Core, porém consegui aprender e me adaptar mais rápido que esperava e entregar uma ótima parte da aplicação a tempo.

##### Front-End
Por não entender de designer (nem de UI/UX) e para evitar sobrecargas, o front-end foi desenvolvido com uma interface bem simples, porém amigável e de fácil utilização.

## Desenvolvedor


- [Gabriel Resende](https://github.com/Sprained "Gabriel Resende")


