require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getCollection, createCard} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

app.get('/collection', getCollection)
app.post('/collection', createCard)




app.listen(SERVER_PORT, () => {console.log(`Server running on ${SERVER_PORT}`)})