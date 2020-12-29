const request = require('supertest');

const app = require('../../app.main');
const conn = require('../../db/db.main');

const HR = require('../../db/models/hr.model');

describe('hr route', () => {
    beforeAll((done) => {
        conn.connect()
            .then(() => {
                const newTestHr = new HR({
                    added_by: '5fe9dc614c7b133684960471',
                    first_name: 'tester',
                    last_name: 'testuser',
                    email: 'testuser@gmail.com',
                    password: '123456',
                    cpassword: '123456',
                    dob: '1995-12-12',
                    hr_no: '100',
                    permission: 'admin'
                })
                newTestHr.save().then(() => done());

            })
            .catch(err => done(err));
    })
    afterAll(async (done) => {
        // conn.close()
        await HR.dropCollection()
            .then(() => done())
            .catch(err => done(err));
    });

    it('subbmitting empty input', () => {
        request(app).post('/hr/add')
            .then(res => {
                const body = res.body;
                expect(body).toEqual({
                    first_name: 'First name is required!',
                    last_name: 'Last name is required!',
                    email: 'Email field is required!',
                    password: 'Password must be atleast 6 charecters!',
                    cpassword: 'confirm password!',
                    dob: 'Date of Birth is required!',
                    hr_no: 'Hr number is required!',
                    permission: 'permission not defined!'
                });
            })
    })

    it('expected success!', (done) => {
        request(app).post('/hr/add')
            .send({
                added_by: '5feaf73a33631231d89e76dc',
                first_name: 'testuser',
                last_name: 'testuser',
                email: 'testuser@gmail.com',
                password: '123456',
                cpassword: '123456',
                dob: '1995-12-12',
                hr_no: '100',
                permission: 'tester'
            }).then(res => {
                const body = res.body;
                console.log(body);
                expect('hello').toEqual('hello')
                done();
            })
    })
})