const { PrismaClient } = require('@prisma/client')
const express = require('express'), morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000,
    env = process.env.NULLSTONE_ENV || 'local';
const prisma = new PrismaClient();

async function getTodos() {
    const todos = await prisma.todo.findMany()
    console.log(todos)
}

app.use(morgan('combined'))
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.redirect('/index.html');
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await prisma.todo.findMany()
        res.json(todos)
    } finally {
        await prisma.$disconnect()
    }
})

const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});
