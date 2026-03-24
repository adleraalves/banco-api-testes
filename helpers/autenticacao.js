const request  =  require ( 'supertest' ); 
const postLogin = require('../fixtures/postLogin.json')
require ( 'dotenv' ) . config ( )

//Capturar o token
const obterToken = async (usuario,senha) => {
    const bodyLogin = {...postLogin}
    bodyLogin.username = usuario
    bodyLogin.senha = senha

    const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)

    //console.log(respostaLogin.status);
    //console.log(respostaLogin.body);

    return respostaLogin.body.token;
}

module.exports = {
    obterToken
}