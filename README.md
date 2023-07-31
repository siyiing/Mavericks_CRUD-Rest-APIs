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
- install sequelize cli: `npm install sequelize-cli`

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
- Create table aka create a js file `sequelize model:generate --name User --attributes name:string,email:string,role:string`

- install express

- To drop db: `sequelize db:drop`

- To run migration: `sequelize db:migrate`

- Create POST request, `sequelize model:generate --name Post --attributes body:string`

tableName: 'users',

- Seeder
- `sequelize seed:generate --name create-fake-users`
- `sequelize db:seed:all`

- `touch .gitignore`
- \*\*/node_modules/

######################################################################################################################################################

# React

- Create React + Typescript project (with existing folder): `npx create-react-app . --template typescript`

- Default download MUI: `npm install @mui/material @emotion/react @emotion/styled`

- Redux: `npm i redux react-redux`
- `npm i redux-thunk @types/redux-thunk`

- Run: `npm start`

`npm i cors`

option > to go
import option .
for all method function is res. option space

######################################################################################################################################################

- `npm install bcryptjs`

######################################################################################################################################################
# JWT

- `npm i epxress jsonwebtoken dotenv`
-  `npm install cookie-parser`


######################################################################################################################################################
# JWT 

CMD: - `npm install jsonwebtoken dotenv`
`npm i --save-dev @types/jsonwebtoken`

Create .env file at root directory to store secret key for JWT:
-  `JWT_SECRET='apple-banana-papaya'`

Create a server.ts, and load secret key: - 

`import dotenv from 'dotenv';`
`dotenv.config();`
`const JWT_SECRET = process.env.JWT_SECRET;`

Create a JWT inside the login or signup route: - when user login or signup, we create a JWT that represent their session 

`import jwt from 'jsonwebtoken';`
`// ...`
`const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn:'1h' });  // 1 hour expiration`

Send JWT to client: - the client needs the JWT in order to make authenticated request // we need to include the token in our response 

`res.json({ token, userId: user.id });`

Use JWT in requests: - the client includues the JWT in the authorization header of subsequent requests

`Authorization: Bearer your_jwt_token`

Verify the JWT: - in server middleware, verify the JWT from the authroization header of incoming request 

```
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
});
```

Access user data in routes: - inside the routes, we can now access `req.user` to get the user data encoded in the JWT

```
app.get('/someRoute', (req, res) => {
  console.log(req.user);  // prints the user data from the JWT
  //...
});
```

Note to handle:
- expired tokens
- invalid tokens 



######################################################################################################################################################
# DOCKER

REMEMBER: `PRODUCTION` IN `CONFIG.JSON `NEEDS TO BE THE `SAME NAME AS THE DOCKER CONTAINER NAME (DB)`
- DOWNLOAD DOCKER DESKTOP


## NOTE:
- always do backend first then frontend 
- image is like an app, it have everything inside 
- for backend and frontend, we need 3 files under root level: 


1. `docker-compose.yml`
  - for us to run command such as: `docker compose up --build` and `docker compose down` 
  - note: the frontend compose file is different from the backend 
  - inside this file, it requires 2 services namely: `express` and `db`. note that their naming convention MUST BE LOWERCASE.

  - in `express`: 
    -- change container name (reference as to which is our server in the docker app) 
    -- CHANGE ports to 5000:8000

  - in `db`: 
    -- change container name (reference as to which is our server)
    -- ports: 5434:5432 (redirect 5434 (my laptop port) to 5432 (docker port))
    -- environment: update the username (from .env) and password (from .env) and the db name ()


2. `Dockerfile`: it can only have 1 `CMD`. if want to run other command, can use `RUN`. e.g. `RUN install...` or `RUN build` etc
  - it process and proceed to build an image 
  - need declare work version, work directory 
  

  FROM node:16-alpine3.14
  WORKDIR /usr/app
  COPY package.json ./  # copy package.json to work directory `./`
  RUN npm install
  COPY . . # copy all code to work directory 
  RUN NODE_ENV=production
  # RUN npm run db:init
  # RUN npm run build
  EXPOSE 8000  # CHANGE TO 5000
  # CMD ["NODE_ENV=test", "npm", "start"]
  CMD ["npm" , "start"]  // is forever the last line 
  # CMD ["npm", "run", "undoMigrate"]


3. `.dockerignore`: need ignore `node_module` and `.git` 


## How to Run Docker 
1. edit `package.json`. 
- NOTE: we need edit the `build` and edit the `start`. the `start` is the command we run at the first time so we need create db and then migrate  

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "PORT=5000 nodemon src/app.ts",
    "start": "NODE_ENV=production npx sequelize db:migrate && npm run build && NODE_ENV=production node dist/app.js",
    "build": "npx tsc"
  },

2. edit `.env` 
- need to add the `USER_NAME` and `PASS_WORD`


3. when we run for the first time, we will have error, thus need go to my own pgAdmin to create a server and then a db.
- In pgAdmin, `TAB > REGISTER > SERVER`, create a server and set the following: 
  -- host: localhost
  -- port: 5434

- When server is created, login and create a db. 
  -- `NOTE`, db name MUST BE the same as the environment name in the docker db (in docker-compose.yml)

- When db is created, rebuild the project by running: `docker compose down` then `docker compose up --build`  

4. RUN DOCKER 
- first time run, `docker compose up --build`  
- look at error, fix error
- before running again, need `docker compose down` then `docker compose up --build`  
- note: if it run on dev instead of production, then we need go `package-lock.json`. under `script` and `start` add `NODE:ENV=production` at the start 
- note: when run docker and see migration - this means that our db connection is done alr. 


# GOOD TO HAVE: 
- in `.gitignore`, add `.env` or `.env.*`  or `!.env.template` 
- can create a `env.template` at the root directory and copy stuff from `.env` to inside 
- usually, e.g. `token = <JWT_Token_Sercret_kEY>`. MUST have `<description of the variable>`



# ?
at package.json
- 3 ways to import env variables
- `.env` file or go script and BEFORE node or nodemon, declare the env there OR start: `PORT = 5000 node dist.app/js`

to run program, IN SCRIPT 
need prettier, mirgate 
NODE_ENV = development run migrate and the NODE_ENV - DEVELOPMENT NODEMON SRC.APP.TS








