import express from 'express'
import cors from 'cors'

import { router } from './routes/auth.routes.js'
import { dbConnection } from './database/config.js'

const app = express()
const PORT = process.env.PORT

//* Database
dbConnection()

//* Cors
app.use(cors())

//* Public directory (middleware)
app.use(express.static('public'))

//* Body Parser
app.use(express.json())

//* Routes
app.use('/api/auth', router)

app.listen(PORT, () => {
  console.log(`dois-calendar API listening on port ${PORT}`)
})
