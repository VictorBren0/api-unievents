# Node.JS, MySQL, JWT, Sequelize, Rest API

API Restful CRUD para um aplicativo mobile usando Node.JS, MySQL, JWT, Sequelize.

## Etapas para configuração

**1. Clone o Respositório**

```bash
git clone https://github.com/VictorBren0/APIUniEvents.git
```

**2. Instale as Dependências**

```bash
Usando Yarn
yarn install

ou

Usando Npm
npm install
```

**3. Crie a database Mysql**
```bash
create database unigeek
```

**4. Altere o nome de usuário e a senha do Mysql de acordo com sua instalação**

+ abra `src/config/database.js`
+ altere `host: 'localhost'`, `username: 'root'` e `password: 'root'` conforme sua instalação do mysql
+ execute o comando 
```bash
Usando Yarn
yarn sequelize db:migrate

ou

Usando Npm
npx sequelize db:migrate
```
**5. Execute o aplicativo usando node.js**

```bash
Usando YARN
yarn start

ou

Usando NPM
npx start
```

O aplicativo começará a ser executado em <http://localhost:3000>
