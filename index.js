import express from 'express'
import cors from 'cors'
import path from 'path'

import { router } from './routes/auth.routes.js'
import { dbConnection } from './database/config.js'
import { eventsRouter } from './routes/events.routes.js'

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
app.use('/api/events', eventsRouter)

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/index.html'))
})

app.listen(PORT, () => {
  console.log(`dois-calendar API listening on port ${PORT}`)
})
