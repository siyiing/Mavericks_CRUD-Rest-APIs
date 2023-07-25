FROM node:16-alpine3.14

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN NODE_ENV=production
# RUN npm run db:init
# RUN npm run build

EXPOSE 8000

# CMD ["NODE_ENV=test", "npm", "start"]
CMD ["npm" , "start"]

# CMD ["npm", "run", "undoMigrate"]