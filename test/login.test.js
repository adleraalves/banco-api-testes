const  request  =  require ( 'supertest' ) ; 
const {expect} = require ('chai');
const postLogin = require ('../fixtures/postLogin.json')
require ( 'dotenv' ) . config ( )

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string quando informado credenciais validas', async function() {
            const bodyLogin = {...postLogin} 

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(postLogin)

            console.log(resposta.status);
            console.log(resposta.body);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
            })
    })
})