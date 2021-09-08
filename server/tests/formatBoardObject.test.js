const formatBoardObject = require('../src/helpers')

describe('formatBoardObject', () => {
    test('transforming an empty list', () => {
        expect(formatBoardObject([])).toEqual({})
    })

    test('transforming a board with a single column and single task', () => {
        const input = [
            {
                boardname: 'Board',
                boardid: 1,
                columnname: 'Column',
                columnid: 1,
                taskname: 'Task',
                taskid: 1,
                taskdescription: 'Description'
            }
        ]

        const output = {
            id: 1,
            name: 'Board',
            columns: [
                {
                    id: 1,
                    name: 'Column',
                    tasks: [
                        {
                            id: 1,
                            name: 'Task',
                            description: 'Description'
                        }
                    ]
                }
            ],
        }

        expect(formatBoardObject(input)).toEqual(output);
    })

    test('transforming a board with a single column and two tasks', () => {
        const input = [
            {
                boardname: 'Board',
                boardid: 1,
                columnname: 'Column',
                columnid: 1,
                taskname: 'Task #1',
                taskid: 1,
                taskdescription: 'Description'
            },
            {
                boardname: 'Board',
                boardid: 1,
                columnname: 'Column',
                columnid: 1,
                taskname: 'Task #2',
                taskid: 2,
                taskdescription: 'Description'
            }
        ]

        const output = {
            id: 1,
            name: 'Board',
            columns: [
                {
                    id: 1,
                    name: 'Column',
                    tasks: [
                        {
                            id: 1,
                            name: 'Task #1',
                            description: 'Description'
                        },
                        {
                            id: 2,
                            name: 'Task #2',
                            description: 'Description'
                        }
                    ]
                }
            ],
        }

        expect(formatBoardObject(input)).toEqual(output);
    })

    test('transforming a board with two columns with two task each', () => {
        const input = [
            {
                boardname: 'Board',
                boardid: 1,
                columnname: 'Column #1',
                columnid: 1,
                taskname: 'Task #1',
                taskid: 1,
                taskdescription: 'Description'
            },
            {
                boardname: 'Board',
                boardid: 1,
                columnname: 'Column #1',
                columnid: 1,
                taskname: 'Task #2',
                taskid: 2,
                taskdescription: 'Description'
            },
            {
                boardname: 'Board',
                boardid: 1,
                columnname: 'Column #2',
                columnid: 2,
                taskname: 'Task #3',
                taskid: 3,
                taskdescription: 'Description'
            },
            {
                boardname: 'Board',
                boardid: 1,
                columnname: 'Column #2',
                columnid: 2,
                taskname: 'Task #4',
                taskid: 4,
                taskdescription: 'Description'
            },
        ]

        const output = {
            id: 1,
            name: 'Board',
            columns: [
                {
                    id: 1,
                    name: 'Column #1',
                    tasks: [
                        {
                            id: 1,
                            name: 'Task #1',
                            description: 'Description'
                        },
                        {
                            id: 2,
                            name: 'Task #2',
                            description: 'Description'
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Column #2',
                    tasks: [
                        {
                            id: 3,
                            name: 'Task #3',
                            description: 'Description'
                        },
                        {
                            id: 4,
                            name: 'Task #4',
                            description: 'Description'
                        },
                    ],
                }
            ],
        }

        const result = formatBoardObject(input);
        expect(result).toEqual(output);
    })
})