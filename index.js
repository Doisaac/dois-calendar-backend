import express from 'express'

const app = express()
const PORT = process.env.PORT

//* Public directory (middleware)
app.use(express.static('public'))

//TODO: Routes

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
