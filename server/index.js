const express = require('express')
const cors = require('cors');
const db = require('./queries')

const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    response.json({ info: `It's working` })
})

app.post('/boards', db.createBoard)
app.get('/boards', db.getBoards)
app.get('/boards/:id', db.getBoardFromId)
app.delete('/boards/:id', db.deleteBoard)


app.listen(port, () => console.log(`Listening on ${port}`))