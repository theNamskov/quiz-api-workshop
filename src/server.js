import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

import { specOptions, customOptions } from './docs/swagger-options'
import postgresDB from './db-config'
import { createUser, handleErrors } from './controller'

// Create our Express application
const app = express()

// As part of our Express Application's configuration, allow the app accept data in json format
app.use(express.json())

// Also, when we accept the data in json format, permit the nesting of objects in objects in request data.
app.use(express.urlencoded({ extended: true }))

// Establish a connection with our online database. Inform us when a connection is established or tell us when an error has occured
postgresDB.authenticate()
.then(function() {
    console.info(`Database connected on ${new Date()}`)
})
.catch(function(error) {
    console.error(error.message)
})

app.post('/create-user', createUser)

// Sets up interface for testing the endpoints
const docs = swaggerJSDoc(specOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs, customOptions))

app.use(handleErrors)

// Set up the PORT/connection tunnel we want our application to listen for requests.
const PORT = 5700
app.listen(PORT, () => console.log(`The quiz-app server is listening on port ${PORT}`))