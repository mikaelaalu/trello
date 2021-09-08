module.exports = function formatBoardObject(board) {
    if (isEmpty(board)) {
        return {}
    }
    return {
        id: board[0].boardid,
        name: board[0].boardname,
        columns: groupBy(board, (item) => item.columnid).map((tasks) => {
            return {
                id: tasks[0].columnid,
                name: tasks[0].columnname,
                tasks: tasks.map(item => ({
                    id: item.taskid,
                    name: item.taskname,
                    description: item.taskdescription
                })),
            }
        }),
    }
}

const groupBy = (list, fn) => {
    const values = Array.from(new Set(list.map((item) => fn(item))))
    return values.map((id) => {
        return list.filter((item) => fn(item) === id)
    })
}

const isEmpty = (list) => {
    return list.length === 0
}