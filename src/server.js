import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import cors from 'cors'

import { specOptions, customOptions } from './docs/swagger-options'
import postgresDB from './db-config'
import { createUser, getUserScores, addScore, getAllScores, handleError } from './controllers'

// Create our Express application
const app = express()

app.use(cors())

// As part of our Express Application's configuration, allow the app accept data in json format
app.use(express.json())

// Also, when we accept the data in json format, permit the nesting of objects in objects in request data.
app.use(express.urlencoded({ extended: true }))

const testUser = {
    username: "testing2",
    country: "Ghana"
}

// Establish a connection with our online database. Inform us when a connection is established or tell us when an error has occured
postgresDB.authenticate()
.then(function() {
    console.info(`Database connected on ${new Date()}`)
})
.catch(function(error) {
    console.error(error.message)
})

// Routes
app.post('/create-user', createUser)

app.get('/get-user-scores/:username', getUserScores)

app.post('/add-score', addScore)

app.get('/get-all-scores', getAllScores)

const docs = swaggerJSDoc(specOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs, customOptions))

app.use(handleError)

// Set up the PORT/connection tunnel we want our application to listen for requests.
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`The quiz-app server is listening on port ${PORT}`))
