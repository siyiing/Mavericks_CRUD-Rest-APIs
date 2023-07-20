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

######################################################################

- `npm install bcryptjs`

######################################################################
# JWT

- `npm i epxress jsonwebtoken dotenv`
-  `npm install cookie-parser`


######################################################################
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