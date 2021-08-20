import express from 'express';
import morgan from 'morgan';
import Prisma from '@prisma/client';
import { MongoClient } from "mongodb";

const app = express();
const port = process.env.PORT || 3000
const env = process.env.NULLSTONE_ENV || 'local';
const {
    MONGO_DB,
    MONGO_URL
} = process.env;

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

app.get('/mongo', async (req, res) => {
    const client = new MongoClient(MONGO_URL)
    try {
        await client.connect()
    } catch (e) {
        console.log("Unable to connect", e)
        res.status(500)
        res.json({ error: e.message })
        return
    }

    const db = client.db(MONGO_DB)

    try {
        const todos = await db.collection("todos").find().toArray()
        res.json(todos)
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({ error: e.message })
    } finally {
        await client.close()
    }
})

const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});
