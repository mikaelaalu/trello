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

const getBoards = (request, response) => {
    pool.query('SELECT * FROM boards ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const deleteBoard = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM boards WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results)
    })
}




module.exports = {
    getBoards,
    createBoard,
    deleteBoard,
}