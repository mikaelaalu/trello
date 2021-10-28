const app = require('../src/app')
const request = require("supertest")
// require('dotenv').config()


describe('POST /boards', () => {

    beforeEach(() => {
    })

    describe.only('should save board to the database', () => {
        test('/boards POST', async () => {
            await request(app).post('/boards').send({
                name: 'From test'
            })
            const response = await request(app).get('/boards')
            expect(response.body.boards).toContainEqual(expect.objectContaining({ name: 'From test' }))
        })


    })

    // test('should specify json in the content typ header', async () => {
    //     const response = await request(app).post('/boards').send({
    //         name: 'From test'
    //     })
    //     expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    // })

    // test('response has boardId', async () => {

    //     for (let i = 0; i < 10; i++) {
    //         createBoard.mockReset()
    //         createBoard.mockResolvedValue(i)
    //         const response = await request(app).post('/boards').send({
    //             name: 'From test'
    //         })
    //         console.log('ressss', response.body)
    //         expect(response.body.id).toBe(i)
    //     }
    // })

    test('should respond with 201 status code', async () => {
        const response = await request(app).post('/boards').send({
            name: 'From test'
        })
        expect(response.statusCode).toBe(201)
    })
    test('should respond with 400', async () => {
        const response = await request(app).post('/boards').send({
            name: '123'
        })
        expect(response.statusCode).toBe(400)
    })


})