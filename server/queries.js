const Pool = require('pg').Pool

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
    pool.query('SELECT * FROM boards WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
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

    // pool.query('DELETE FROM columns WHERE board_id = $1', [id], (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     res.status(200).send(results)
    // })

    // pool.query('DELETE FROM tasks WHERE board_id = $1', [id], (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     res.status(200).send(results)
    // })
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

const getColumns = (req, res) => {
    const boardId = parseInt(req.params.id)
    pool.query('SELECT * FROM columns WHERE board_id = $1', [boardId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
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

    // pool.query('DELETE FROM tasks WHERE column_id = $1', [id], (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     res.status(200).send(results)
    // })
}

const createTask = (req, res) => {
    const { columnId, boardId, name, description } = req.body
    pool.query('INSERT INTO tasks (column_id, board_id, name, description) VALUES ($1, $2, $3, $4) RETURNING *', [columnId, boardId, name, description], (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send(result.rows[0])
    })
}

const getTasks = (req, res) => {
    const boardId = parseInt(req.params.id)
    pool.query('SELECT * FROM tasks WHERE board_id = $1', [boardId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
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





module.exports = {
    getBoards,
    getBoardFromId,
    createBoard,
    deleteBoard,
    getColumns,
    createColumn,
    deleteColumn,
    createTask,
    getTasks,
    deleteTask
}