const  request  =  require ( 'supertest' ); 
require ( 'dotenv' ) . config ( )

//Capturar o token
const obterToken = async (usuario,senha) => {
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': usuario,
            'senha': senha
        })

    //console.log(respostaLogin.status);
    //console.log(respostaLogin.body);

    return respostaLogin.body.token;
}

module.exports = {
    obterToken
}