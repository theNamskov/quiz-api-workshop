import { v4 as uuidv4 } from 'uuid'

import User from './models/User'
import Score from './models/Score'

export const createUser = async (request, response, next) => {
    try {
	// Manually add uid field to the userDetails to generate unique key
	const userDetails = { ...request.body, uid: uuidv4() }
        const user = new User(userDetails)
        const createdUser = await user.save()
        console.log(createdUser)
        return response.status(201).json(createdUser)
    } catch(error) {
        next(error)
    }
}

export const getUserScores = async (request, response, next) => {
    try {
        const  userScores = await User.findAll({ where: { username: request.params.username }, include: [Score] })
        console.log(userScores)
        if(!userScores.length) return response.status(404).json({ message: `No scores found for ${request.params.username}` })
        return response.status(200).json(userScores)
    } catch(error) {
        next(error)
    }
}

export const addScore = async (request, response, next) => {
    try {
	// Manually add uid field to the scoreDetails to generate unique key
	const scoreDetails = { ...request.body, scoreid: uuidv4() }
        const newScore = new Score(scoreDetails)
        const addedScore = await newScore.save()
        console.log(addedScore)
        return response.status(201).json(addedScore)
    } catch(error) {
        next(error)
    }
}

export  const getAllScores = async (request, response, next) => {
    try {
        const allScores = await Score.findAll({ include: [User], order: [['value', 'DESC']] })
        console.log(allScores)
        if(!allScores.length) return response.status(404).json({ message: 'There are currently no scores in the database.' })
        return response.status(200).json(allScores)
    } catch(error) {
        next(error)
    }
}

export const handleError = (error, request, response, next) => {
    response.status(500).send(`
    <h4 style="text-align: center;">Looks like we have a hot error 🥵</h4>
    <div style="background: #e7e7e7; border: 1px solid black; box-shadow: 8px 4px 5px grey; height: 70vh; margin: 2px 20%; padding: 1em 1em; box-sizing: border-box;">
        <h3>${error.message}</h3>
        <p>${error}</p>
    </div>
    `)
    next()
}
