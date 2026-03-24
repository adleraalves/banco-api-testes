const  request  =  require ( 'supertest' ) ; 
const {expect} = require ('chai');
const {obterToken} = require('../helpers/autenticacao.js')
require ( 'dotenv' ) . config ( )

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$10,00', async() => {
            //Capturar o token
            const token = await obterToken('julio.lima', '123456');

            const resposta = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                'contaOrigem': 1,
                'contaDestino': 2,
                'valor': 11,
                'token': ""
                })

            console.log(resposta.body);

            expect(resposta.status).to.equal(201);
        })
        it('Deve retornar erro com 422 quando o valor da transferência for baixo de R$10,00', async() => {
            //Capturar o token
            const token = await obterToken('julio.lima', '123456');
                        
            const resposta = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                contaOrigem: '1',
                contaDestino: '2',
                valor: 7,
                token: ""
                })

            console.log(resposta.body);

            expect(resposta.status).to.equal(422);            
        })

    })
})