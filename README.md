# Node.JS, MySQL, JWT, Sequelize, Rest API

API Restful CRUD para um aplicativo mobile usando Node.JS, MySQL, JWT, Sequelize.

## Etapas para configuração

**1. Clone o Respositório**

```bash
git clone https://github.com/VictorBren0/APIUniEvents.git
```

**2. Crie a database Mysql **
```bash
create database unigeek
```

**3. Altere o nome de usuário e a senha do Mysql de acordo com sua instalação**

+ abra `src/config/database.js`
+ altere `host: 'localhost'`, `username: 'root'` e `password: 'root'` conforme sua instalação do mysql
+ execute o comando 
Usando YARN```bash
yarn sequelize db:migrate
```
ou
Usando NPM
```bash
npx sequelize db:migrate
```
