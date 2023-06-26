# Mavericks - Simple CRUD Rest APIs

- package.json: `npm init --yes`

- tsconfig.json: `tsc --init`
- "outDir": "./dist"

- `node -v`
- `npm install ts-node-dev typescript -D`
- `npm i express`
- `npm i typescript`
- `npm install @types/node @types/express -D`
- `npm install nodemon`
- `npm i joi`

- "dev": "nodemon src/app.ts",
- "build": "npx tsc"

- RUN TGT:
- `npm run dev`
- `npx tsc -w`

- npm i helmet (ignore)

- Specfic port to use: `export PORT=5000` (ignore)

  "devDependencies": {
  "@types/express": "^4.17.17",
  "@types/node": "^20.3.1",
  "ts-node-dev": "^2.0.0",
  "typescript": "^5.1.3"
  },
  "dependencies": {
  "express": "^4.18.2",
  "nodemon": "^2.0.22"
  }

// NOTE:
// routes import controller  
// controller import services
// services import the models

// Methods in app
// app.get()
// app.post()
// app.put()
// app.delete()


- `npm i sequelize`
- install sequelize and postgresql: `npm install sequelize pg pg-hstore` 
- install sequelize cli: `sudo npm install -g sequelize-cli`

- `sequelize init` (create config, model, migration, seeders folder)
- In config.json, under development, change the username, password, database and dialect 

  "development": {
    "username": "postgres",
    "password": "siying",
    "database": "sequelize_tut_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },


- To show the list of commands: `sequelize`
- To create db: `sequelize db:create`
- Create table aka create a js file  `sequelize model:generate --name User --attributes name:string,email:string,role:string`

- install express

- To drop db: `sequelize db:drop`

- To run migration: `sequelize db:migrate`


- Create POST request, `sequelize model:generate --name Post --attributes body:string`

 tableName: 'users',



- Seeder
- `sequelize seed:generate --name create-fake-users`
- `sequelize db:seed:all`


- `touch .gitignore`
- node_modules/



option > to go
import option . 
for all method function is res. option space 