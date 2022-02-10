import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index'
let should = chai.should()
import 'mocha'

chai.use(chaiHttp)
describe('Users', () => {
    describe('/GET user', () => {
        it('it should get a user', (done) => {
            chai.request(app)
            .get('/user/root')
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })
    })
})