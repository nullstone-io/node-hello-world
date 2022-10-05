FROM node:15-alpine

WORKDIR /app/public
COPY public/ .

WORKDIR /app
COPY app.js .
COPY tracing.js .
COPY prisma .
COPY package.json .
RUN npm install

ENV PORT=80

CMD npm run migrate --force && node app.js
