const http = require('http');

const hostname = '';
const port = process.env.PORT || 3000;
const env = process.env.NULLSTONE_ENV || 'local';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Welcome to Nullstone! Nullstone Environment: ${env}`)
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
