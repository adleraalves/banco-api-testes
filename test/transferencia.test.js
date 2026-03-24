const  request  =  require ( 'supertest' ) ; 
const {expect} = require ('chai');
const {obterToken} = require('../helpers/autenticacao.js')
const postTransferencias = require('../fixtures/postTransferecias.json')
require ( 'dotenv' ) . config ( )

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        let token

        beforeEach( async () => {
            //Capturar o token
            token = await obterToken('julio.lima', '123456');
        })

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$10,00', async() => {
            const bodyTransferencias = {...postTransferencias}

            const resposta = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTransferencias)

            console.log(resposta.body);

            expect(resposta.status).to.equal(201);
        })
        it('Deve retornar erro com 422 quando o valor da transferência for baixo de R$10,00', async() => {
            const bodyTransferencias = {...postTransferencias}
            bodyTransferencias.valor = 7

            const resposta = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTransferencias)

            console.log(resposta.body);

            expect(resposta.status).to.equal(422);            
        })

    })
})