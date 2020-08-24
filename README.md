# Imersão prática Inhalt!

### Requisitos

---

- Realizar login;
- Listar os produtos cadastrado com um filtro;
- Cadastrar novos produtos com nome, valor e quantidade em estoque;
- Realizar uma venda, o qual consiste em selecionar o produto e a quantidade vendida;
- Deve ser possível emitir um relatório para ser visualizado os itens vendidos com totalização;
- Possibilidade de criar novos usuários para gerenciar o sistema ;

Obs: Não deve ser possível vender produtos que tenha zero no estoque.

### Tecnologias

---

##### FrontEnd
- ReactJS

##### Api
- Asp.NET Core

##### Banco de dados
- InMemory

### Introdução

---

O sistema foi feito em ReactJS e Asp.NET Core sem o uso de um banco de dados relacional ou não relacional. Foi optado para uso de um banco de dados em memória, o próprio InMemory do entity framework, pela facilidade dele para prototipação de um projeto e por se aproximar de uma conexão com outros tipos de bancos de dados, assim podendo facilmente substituído por um banco sql.

Para startar a api, tendo o dotnet sdk instalado na máquina, abra o terminal na pasta da api e digite o seguinte comando `dotnet run`.

Para startar o frontend, tendo o node instalado na máquina, abra o terminal na pasta do frontend e digite o seguinte comando `npm i` ou `yarn` para atualizar as dependências e `npm start` ou `yarn start` para startar o frontend.

Ao startar o sistema na página principal se encontrará um link escrito 'Teste' ao clicar la ira popular o banco de dados InMemory para começar o uso, por motivos do banco de dados InMemory perder todos os dados após finalizar a api.

Para logar na aplicação a primeira vez utilize o usuário: Teste e a senha: teste@123

### Desenvolvimento e dificuldades

---

##### API
No desenvolvimento da api teve uma dificuldade inicial, pois nunca tinha trabalhado com o Asp.NET Core. Porém a curva de aprendizado do mesmo é pequena e foi fácil de me adaptar em desenvolver nele. Foi entregue quase todos os requisitos solicitados para api, somente a parte de relatórios foi deixado em branco.

No relatório foi tentado fazer um relatório onde o usuário poderia baixar um arquivo em csv ou pdf, tentei seguir mesmo caminho que já fiz no node uma vez. Pegar as informações do banco de dados tratar a mesma num json, criando um array de cabeçalho servindo como filtro também para mostrar somente o solicitado e assim criando o arquivo num `fs.write` e disponibilizando um link onde o frontend iria requisitar o mesmo e assim retornar o arquivo para download.

Porem por Asp.NET ser diferente do Node a mesma lógica não estava funcionando então preferi deixar em branco para focar no resto do sistema e depois voltava nisso. Mas algo o qual pode ser resolvido facilmente, só preciso pensar numa lógica que melhor adapte ao c# e caso necessário procurar alguma lib que possa ajudar na tarefa.

##### Frontend
O frontend foi desenvolvido de modo simples e evitando de ficar sobrecarregado, como não tenho experiência como designer deve ter algo fora do UX e UI, porém a interface ta facil de usar.

### Desenvolvedor

---

- [Gabriel Resende](https://github.com/Sprained "Gabriel Resende")


