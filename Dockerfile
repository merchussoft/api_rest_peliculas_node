FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

#CMD ['npm', 'start']

ENTRYPOINT ['node', 'src/peliculas.js']
