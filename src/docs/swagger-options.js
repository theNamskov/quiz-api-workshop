export const specOptions = {
    swaggerDefinition: {
        openapi: '3.0.2',
        info: {
            title: 'Quiz App API',
            description: "A simple Nodejs application that provides endpoints for creating a user, adding a user's quiz scores, retrieving all their scores and getting all scores.",
            contact: {
                name: 'Google DSC Legon',
                url: 'https://dsc.community.dev/university-of-ghana/',
                email: 'dsc.uglegon@gmail.com',
            },
            servers: [ 'https://dscug-quizapi.herokuapp.com', 'http://localhost:3000' ],
            version: '1.0.0',
        },
    },
    tags: [ 'Some CRUD Routes' ],
    apis: [
        'src/docs/*.yaml',
    ],
    consumes: [
        'application/json',
    ],
    produces: [
        'application/json',
    ],
}

export const customOptions = {}