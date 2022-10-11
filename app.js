const process = require('process');
const express = require('express');
const morgan = require('morgan');
const Prisma = require('@prisma/client');

const app = express();
const port = process.env.PORT || 3000

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

app.use(morgan('combined'))
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.redirect('/index.html');
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await prisma.todos.findMany()
        res.json({ data: todos })
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({ error: e.message })
    }
})

const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});
