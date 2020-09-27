import { DataTypes } from 'sequelize'

import postgresDB from '../db-config'

const User = postgresDB.define('users', {
    uid: { type: DataTypes.STRING, primaryKey: true, },
    username: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
})

export default User
