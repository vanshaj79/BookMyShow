const express = require('express')
const cors = require("cors")
require('dotenv').config() 
// this will load your all environment variables from a '.env' file into 'process.env'in your project.
// the config() function call loads the variables from the '.env' file into the environment , making them accessible to the project

const app = express();
// creating instance of express to define routes, middlewares and other

const dbConfig = require('./config/dbConfig')
// connecting to database

app.use(cors({
    origin:"*"
}))

// importing routes
const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')
const theatresRoutes = require('./routes/theatresRoutes')
const showRoutes = require('./routes/showRoutes')
// middleware
app.use(express.json())
app.use('/api/users', userRoutes.router)
app.use('/api/movies', movieRoutes.router)
app.use('/api/theatres', theatresRoutes.router)
app.use('/api/shows', showRoutes.router)

app.listen(8080, () => {
    console.log("Server has started")
})