const Hapi = require('@hapi/hapi')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const init = async () => {

    const server = Hapi.server({
        port: 7070,
        host: 'localhost'    
    })

    //ROTA SIMPLES
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return {
                now: Date.now(),
                message: 'This is Pernambuco!!!'
            }
        }   
    })

    //ROTA COM ERRO
    server.route({
        method: 'GET',
        path: '/bad',
        handler: (request, h) => {
            return h.response({
                message: ReasonPhrases.BAD_REQUEST
            }).code(StatusCodes.BAD_GATEWAY)
        }
    })
    
    //ROTA COM PARAMETRO POR PATH
    server.route({
        method: 'GET',
        path: '/accenture/{username?}',
        handler: (request, h) => {
            const user = request.params.username ? request.params.username : 'aluno accenture'
            return `Hello, ${user}`
        }
    })

    //ROTA COM PARAMETROS POR QUERY
    server.route({
        method: 'GET',
        path: '/query',
        handler: (request, h) => {
            const queryParam = request.query
            return { value: queryParam }
        }

    })

    server.route({
        method: 'POST',
        path: '/signup',
        handler: (request, h) => {
            
            const payload = request.payload
            return `${payload.username}, sua conta foi criada com sucesso !!!`
        }
    })


        await server.start()
}


process.on('unhandledRejection', (err) => {
    console.error('Deu ruim aqui')
    console.log(err)
    process.exit(1)
})

init();