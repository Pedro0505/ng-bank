# Ng Bank

Projeto full-stack que simula um bando digital, com login, registro, autenticação JWT, transações entre contas e histórico dessas transações.

Demonstração do projeto:

![](https://github.com/Pedro0505/ng-bank/blob/main/public/presentation.gif?raw=true)

## Tecnologias Usadas

Testes:
> Jest

DevOps:
> Docker

DataBase:
> PostgreSql

### Back-End:

> NodeJS, Express, JWT, Prisma ORM, Typescript

### Front-End:

> React, Typescript, MUI

## Executando a Aplicação

A execução local pode ser dada das seguintes formas: Docker ou Node 

<details>
  <summary><b>Iniciando o projeto com docker 🐳</b></summary><br>

  ***⚠️ Para garantir um bom funcionamento é necessário que tenha instalado o docker e o docker-compose nas versões 20.10.16 e 1.29 ou superior respectivamente⚠️***

  1. Clone o projeto

  ```bash
git clone git@github.com:Pedro0505/ng-bank.git
  ```

  2. Entre no diretório do projeto

  ```bash
cd ng-bank
  ```

  3. Suba os containers

  ```bash
docker-compose -f docker-compose.dev.yml up --build -d
  ```

  5. Quando o processo dos containers estiver acabado acesse a aplicação usando o seguinte endereço

  ```bash
http://localhost:3000
  ```

  6. Para derrubar os containers

  ```bash
docker-compose -f docker-compose.dev.yml down --rmi all --volumes --remove-orphans
  ```
</details>

<details>
  <summary><b>Node</b></summary><br>

  ***⚠️ Para rodar localmente é necessário ter o PostgreSql instalado localmente ⚠️***
  
  ***Obs: Para usar localmente deve ser preenchido com as informações necessárias no '.env', conforme está escrito no '.env.example'***
  
  Clone o projeto

  ```bash
git clone git@github.com:Pedro0505/ng-bank.git
  ```

  Entre no diretório do projeto na parte da api

  ```bash
cd ng-bank/api
  ```

  Instale as dependências

  ```bash
npm install
  ```

  Inicie o servidor

  ```bash
npm run dev
  ```
  
  Entre no diretório do projeto na parte do front-end

  ```bash
cd ..
cd ng-bank/web
  ```

  Instale as dependências

  ```bash
npm install
  ```

  Inicie o servidor

  ```bash
npm start
  ```

  Acesse a aplicação usando o seguinte endereço

  ```bash
localhost:3000
  ```
</details>
