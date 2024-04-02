# Programação Avançada para WEB.

## Expansão das Funcionalidades da API Dositio

## Contexto
Nessa disciplina estamos desenvolvendo as API’s de backend utilizando Node.js/Fastify com bancos de dados 
não-relacionais (MongoDB). No projeto prático, "Dositio", o desafio é fazer um CRUD com as seguintes rotas: 
* GET `/products`
* GET `/products/:id`
* POST `/products`
* PUT `/products/:id`
* DELETE `/products/:id`
* GET `/categories`
* POST `/categories`
* PUT `/categories/:id`
* DELETE `/categories/:id`
* GET `/categories/:id/products`
* POST `/register`

e terá uma rota de autencticacão:
  `/auth`


## Os primeiros passos
#### Estarei usando o Thunder Client para fazer requisições pelo VS Code
Para instalar todas as dependências do projeto, basta rodar no terminal: 
``` npm install ``` ou apenas ``` npm i ```

Depois de instalar todas as dependências, agora é hora de configurar o arquivo **.env**, no projeto existe um
arquivo **.env.sample** para ser seguido como exemplo.

Para ter acesso as rotas autenticadas, você terá que fazer um POST na rota `/auth`, para isso:

1° - Acesse o Thunder Cliente e procure por Body e coloque no formato JSON;

2° - Coloque a URL correta e mude o método para POST;

3° - Assim será o formato do arquivo:
~~~JSON
    {
  
    "name" : "Nome1",
  
    "password" : "password"

    }
~~~

Lembrando que você precisará configurar a senha no arquivo .env

Assim, terá acesso a um x-access-token que vai ser fornecido, depois disso:

1° - Procure por Headers;

2° - Você terá 2 campos para preencher: header e value;

3° - No header é x-access-token e no value é o token que foi fornecido anteriormente.

## Rodando o código

No momento, há 2 scripts que podem ser rodados, são eles:

~~~
npm run dev

~~~
e
~~~
npm run test

~~~~

`npm run dev`: é para rodar a aplicação e conseguir fazer as requisições.

`npm run test`: é um script de teste que retornará uma tabela contendo informações sobre o projeto.