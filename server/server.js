const express = require('express')
require('dotenv').config() 
// this will load your all environment variables from a '.env' file into 'process.env'in your project.
// the config() function call loads the variables from the '.env' file into the environment , making them accessible to the project

const app = express();
// creating instance of express to define routes, middlewares and other

const dbConfig = require('./config/dbConfig')
// connecting to database


// importing routes
const userRoutes = require('./routes/userRoutes')

// middleware
app.use(express.json())
app.use('/api/users', userRoutes.router)

app.listen(8080, () => {
    console.log("Server has started")
})