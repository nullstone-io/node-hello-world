const express = require('express');
const app = express();

const port = process.env.PORT || 3000,
    env = process.env.NULLSTONE_ENV || 'local';

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.redirect('/index.html');
})

const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});
