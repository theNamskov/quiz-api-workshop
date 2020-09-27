import { v4 as uuidv4 } from 'uuid'

import User from './models/User'
import Score from './models/Score'

export const createUser = async (request, response, next) => {
    try {
        const userDetails =  { ...request.body, uid: uuidv4() }
        const newUser = new User(userDetails)
        console.log('before save')
        const createdUser = await newUser.save()
        console.log('aftersave')
        return response.status(201).json(createdUser)
    } catch(error) {
        next(error)
    }
}

export const handleErrors = async (error, request, response, next) => {
    console.log(error)
    response.status(500).send(`
    <h4 style="text-align: center;">Looks like we have a hot error 🥵</h4>
    <div style="background: #e7e7e7; border: 1px solid black; box-shadow: 8px 4px 5px grey; height: 70vh; margin: 2px 20%; padding: 1em 1em; box-sizing: border-box;">
        <h3>${error.message}</h3>
        <p>${error}</p>
    </div>
    `)
    next()
}