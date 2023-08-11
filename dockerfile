FROM node:18-alpine
ENV NODE_ENV=development

LABEL maintainer="Preedee Puanukunnon"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
