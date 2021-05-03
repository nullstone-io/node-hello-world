FROM node:15-alpine

WORKDIR /app
COPY app.js .

ENV PORT=80

CMD ["node", "app.js"]
