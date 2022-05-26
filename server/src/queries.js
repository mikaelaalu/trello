const Pool = require("pg").Pool
const formatBoardObject = require("./helpers")

const pool = new Pool({
  user: "trello",
  host: "localhost",
  database: "trello",
  password: "secret",
  port: 5432,
})

const createBoard = async (dbName) => {
  const results = await pool.query(
    `INSERT INTO boards (name) VALUES ($1) RETURNING *`,
    [dbName]
  )
  return results.rows[0]
}

const getBoards = async () => {
  const results = await pool.query("SELECT * FROM boards ORDER BY id ASC")
  return results.rows
}

const getBoardFromId = async (id) => {
  const board = await pool.query(
    "SELECT boards.name as boardName, boards.id as boardId, columns.name as columnName, columns.id as columnId, tasks.name as taskName, tasks.id as taskId, tasks.description as taskDescription FROM boards LEFT JOIN columns ON columns.board_id = boards.id LEFT JOIN tasks ON tasks.column_id = columns.id WHERE boards.id = $1",
    [id]
  )
  return formatBoardObject(board.rows)
}

const deleteBoard = async (id) => {
  const board = await pool.query("DELETE FROM boards WHERE id = $1", [id])

  return board
}

const createColumn = async (boardId, name) => {
  const column = await pool.query(
    "INSERT INTO columns (board_id, name) VALUES ($1, $2) RETURNING *",
    [boardId, name]
  )

  return column.rows[0]
}

const deleteColumn = async (id) => {
  const column = await pool.query("DELETE FROM columns WHERE id = $1", [id])
  return column
}

const createTask = async (columnId, name, description) => {
  const task = await pool.query(
    "INSERT INTO tasks (column_id, name, description) VALUES ($1, $2, $3) RETURNING *",
    [columnId, name, description]
  )

  return task
}

const deleteTask = async (id) => {
  const task = await pool.query("DELETE FROM tasks WHERE id = $1", [id])
  return task
}

const updateTask = async (id, description) => {
  const task = await pool.query(
    "UPDATE tasks SET description = $1 WHERE id = $2",
    [description, id]
  )
  return task
}

// const updateColumnId = (req, res) => {
//   const { id, columnId } = req.body
//   pool.query(
//     "UPDATE tasks SET column_id = $1 WHERE id = $2",
//     [columnId, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       res.status(200).send(results)
//     }
//   )
// }

module.exports = {
  getBoards,
  getBoardFromId,
  createBoard,
  deleteBoard,
  createColumn,
  deleteColumn,
  createTask,
  deleteTask,
  updateTask,
  // updateColumnId,
}
