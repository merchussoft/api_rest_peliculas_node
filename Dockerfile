FROM node:15.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 4000

CMD ["npm", "start"]

#ENTRYPOINT ["node", "src/peliculas.js"]
