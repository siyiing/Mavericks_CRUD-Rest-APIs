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
