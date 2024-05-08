
FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

COPY .env ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
