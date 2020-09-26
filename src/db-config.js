import 'dotenv/config'
import { Sequelize as SequelizeDB } from 'sequelize'

// Sequelize provides database connection possibilities for different types of databases.
// Here, we tell Sequelize the type of database we are connecting to (in this case, postgresql database) and give it the necessary credentials to connect to the particular instance.
const postgresDB = new SequelizeDB(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    { host: process.env.DATABASE_HOST, dialect: 'postgres' },
)

// Exposing the database configuration setup to any other code in our app. If any code makes an import from this file, this is the default result/value they get.
export default postgresDB