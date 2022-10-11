import express from 'express';
import morgan from 'morgan';
import Prisma from '@prisma/client';
import createTracer from './tracing.js';

const appName = "core-webapp"; //TODO: process.env.NULLSTONE_APP
const version = "dev"; //TODO: process.env.NULLSTONE_VERSION
const envName = process.env.NULLSTONE_ENV || 'local';
const tracer = createTracer(appName, version, envName);
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
