const express = require('express')
const app = express()


app.get('/hello', (req, res) => {
    res.send({ 'Hello': 'Hej' })
});

app.listen(4000, () => console.log('Listening on 4000'))