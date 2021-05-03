FROM node:15-alpine

WORKDIR /app/public
COPY public/ .

WORKDIR /app
COPY app.js .
COPY package.json .
RUN npm install

ENV PORT=80

CMD ["node", "app.js"]
