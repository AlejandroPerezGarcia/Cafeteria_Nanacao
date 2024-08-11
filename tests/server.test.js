const request = require('supertest')
const server = require('../index')

const id = Math.floor(Math.random() * 9999999999)
const coffe = { id, nombre: 'cafe de prueba' }

describe('Operaciones CRUD de cafes', () => {
  test('REQ1 [GET /cafes] deveria devolver un status code 200 y un array con almenos 1 elementos', async () => {
    const response = await request(server).get('/cafes').send()
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
  })

  test('REQ2 [DELETE /cafes/:id] | Deberia retonar  un error 404 cuando el id no exixte', async () => {
    const response = await request(server).delete('/cafe/fake_coffee').set('Authorization', 'fake_token').send()
    expect(response.status).toBe(404)
  })

  test('REQ3 [POST /cafes] agrega un nuevo cafe y devuelve un codigo 201 al crear un nuevo cafe', async () => {
    const response = await request(server).post('/cafes').send(coffe)
    expect(response.status).toBe(201)
    expect(response.body).toContainEqual(coffe)
  })

  test('REQ4 [PUT /cafes/:id] | Deberia retornar un codigo 400 al intentar actualizar un cafe, donde el params id que no corresponda al paylad id ', async () => {
    const response = await request(server).put('/cafes/fake_coffe_id').send(coffe)
    expect(response.status).toBe(400)
  })
})
