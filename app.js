import express from 'express';
import morgan from 'morgan';
import Prisma from '@prisma/client';
import createTracer from './tracing';

const tracer = createTracer("node-hello-world");
const app = express();
const port = process.env.PORT || 3000
const env = process.env.NULLSTONE_ENV || 'local';

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
