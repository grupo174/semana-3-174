const request = require('supertest')
const app = require('../server')
describe('login Endpoints', () => {
    it('login user', async() => {
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'ejemplo@gmail.com',
                password: 'micontraseña',

            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('accessToken');
    })

    it('can not login user with invalid password', async() => {
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'ejemplo@gmail.com',
                password: 'micontraseñaa',

            })
        expect(res.statusCode).toEqual(401)
    })

    it('can not login user with invalid username', async() => {
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'ejempl@gmail.com',
                password: 'micontraseña',

            })
        expect(res.statusCode).toEqual(404)
    })
})