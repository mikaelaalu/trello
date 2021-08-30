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
app.post('/columns', db.createColumn)
app.get('/columns/:id', db.getColumns)
app.delete('/columns/:id', db.deleteColumn)
app.post('/tasks', db.createTask)
app.get('/tasks/:id', db.getTasks)
app.delete('/tasks/:id', db.deleteTask)


app.listen(port, () => console.log(`Listening on ${port}`))