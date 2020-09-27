import { DataTypes } from 'sequelize'

import postgresDB from '../db-config'
import User from './User'

const Score = postgresDB.define('scores', {
    scoreid: { type: DataTypes.STRING, primaryKey: true, },
    userid: { type: DataTypes.STRING, },
    value: { type: DataTypes.DOUBLE },
    category: { type: DataTypes.STRING },
})

User.hasMany(Score, { foreignKey: 'userid' })
Score.belongsTo(User, { foreignKey: 'userid' })

export default Score