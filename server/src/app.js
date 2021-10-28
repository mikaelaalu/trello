const express = require("express")
const cors = require("cors")
const db = require("./queries")
require("dotenv").config()

console.log(process.env.DB_PORT)

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json({ info: `It's working` })
})

app.post("/boards", async (req, res) => {
  const { name } = req.body
  // if (name.length < 4) {
  //     res.status(400).send({ error: 'Name is too short' })
  //     return
  // }
  try {
    const data = await db.createBoard(name)
    res.status(201).send(data)
  } catch {
    res.sendStatus(500)
    return
  }
})

app.get("/boards", async (req, res) => {
  // res.send({ boards: [{ name: 'From test' }] })
  // try {
  const data = await db.getBoards()
  res.send(data)

  // } catch {
  // res.sendStatus(500)
  // return
  // }
})

app.delete("/boards/:id", async (req, res) => {
  const id = req.params.id
  const board = await db.deleteBoard(id)

  res.send(board)
})

app.get("/boards/:id", async (req, res) => {
  const id = req.params.id
  const board = await db.getBoardFromId(id)

  res.send(board)
})

app.post("/columns", async (req, res) => {
  const { boardId, name } = req.body
  const column = await db.createColumn(boardId, name)
  res.send(column)
})

module.exports = app

// app.get('/boards', db.getBoards)
// app.get('/boards/:id', db.getBoardFromId)
// app.delete('/boards/:id', db.deleteBoard)
// app.post('/columns', db.createColumn)
// app.delete('/columns/:id', db.deleteColumn)
// app.post('/tasks', db.createTask)
// app.delete('/tasks/:id', db.deleteTask)
// // app.put('/tasks/:id', db.updateTask)
// app.put('/tasks/:id', db.updateColumnId)

// module.exports = { app }
