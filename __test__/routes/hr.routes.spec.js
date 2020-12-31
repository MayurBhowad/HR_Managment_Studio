const request = require('supertest');

const app = require('../../app.main');
const conn = require('../../db/db.main');

const HR = require('../../db/models/hr.model');

describe('hr route', () => {
    let testerId;
    let token;
    beforeAll((done) => {
        conn.connect()
            .then(() => {
                done();
            })
            .catch(err => done(err));
    })
    afterAll((done) => {
        conn.dropHrCollection()
            .then(() => {
                conn.close().then(() => done())
                    .catch(err => { console.log(err); done(err) });
            })
            .catch(err => { console.log(err); done(err) });
    });


    it('login test', (done) => {
        request(app).post('/hr/login')
            .send({
                email: 'nick@gmail.com',
                password: '123456'
            }).then(res => {
                token = res.body.token;
                expect(res.body.success).toEqual(true);
                done();
            })
    })

    it('subbmitting input without authorized token to `/hr/add`', (done) => {
        request(app).post('/hr/add')
            .then(res => {
                const body = res.text;
                expect(body).toEqual('Unauthorized');
                done();
            })
    })

    it('subbmitting empty input', (done) => {
        request(app).post('/hr/add').set('Authorization', token)
            .then(res => {
                const body = res.body;
                expect(body).toMatchSnapshot();
                done();
            })
    })

    it('expected success!', (done) => {
        request(app).post('/hr/add').set('Authorization', token)
            .send({
                // added_by: testerId,
                first_name: 'testuser1',
                last_name: 'testuser1',
                email: 'testuser1@gmail.com',
                password: '123456',
                cpassword: '123456',
                dob: '1995-12-12',
                hr_no: '101',
                permission: 'tester'
            }).then(res => {
                const body = res.body;
                expect(body.added_by).toEqual('5feb12e47393bd30b043e462');
                expect(body.email).toEqual('testuser1@gmail.com');
                expect(body.hr_no).toEqual(101);
                expect(body.permission).toEqual('tester');
                done();
            })
    })
})