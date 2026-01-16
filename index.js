import express from 'express'
import { router } from './routes/auth.routes.js'

const app = express()
const PORT = process.env.PORT

//* Public directory (middleware)
app.use(express.static('public'))

//* Body Parser
app.use(express.json())

//* Routes
app.use('/api/auth', router)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
