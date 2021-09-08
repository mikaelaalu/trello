const Pool = require('pg').Pool
const transformData = require('./helpers')

const pool = new Pool({
    user: 'trello',
    host: 'localhost',
    database: 'trello',
    password: 'secret',
    port: 5432,
})

const createBoard = (req, res) => {
    const { name } = req.body
    pool.query('INSERT INTO boards (name) VALUES ($1) RETURNING *', [name], (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send(result.rows[0])
    })
}

const getBoards = (req, res) => {
    pool.query('SELECT * FROM boards ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getBoardFromId = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT boards.name as boardName, boards.id as boardId, columns.name as columnName, columns.id as columnId, tasks.name as taskName, tasks.id as taskId, tasks.description as taskDescription FROM boards LEFT JOIN columns ON columns.board_id = boards.id LEFT JOIN tasks ON tasks.column_id = columns.id WHERE boards.id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }

        const data = transformData(results.rows)
        res.status(200).json(data)
    })
}

const deleteBoard = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM boards WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results)
    })


}

const createColumn = (req, res) => {
    const { boardId, name } = req.body
    pool.query('INSERT INTO columns (board_id, name) VALUES ($1, $2) RETURNING *', [boardId, name], (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send(result.rows[0])
    })
}

const deleteColumn = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM columns WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results)
    })


}

const createTask = (req, res) => {
    const { columnId, name, description } = req.body
    pool.query('INSERT INTO tasks (column_id, name, description) VALUES ($1, $2, $3) RETURNING *', [columnId, name, description], (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send(result.rows[0])
    })
}

const deleteTask = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results)
    })
}

const updateTask = (req, res) => {
    const { id, name, description } = req.body
    pool.query('')
}

module.exports = {
    getBoards,
    getBoardFromId,
    createBoard,
    deleteBoard,
    createColumn,
    deleteColumn,
    createTask,
    deleteTask
}