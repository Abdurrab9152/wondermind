
import express from 'express'
import cors from 'cors'
import { errorHandler } from './middlewares/error.middleware.js'

// we use cookie-parser to parse HTTP server cookie parsing and serialization
import cookieParser from 'cookie-parser'
import morganMiddleware from './logger/morgan.logger.js'
const app = express()

// we use, use method of express to use middlewares and for configuration
const whitelistString = process.env.CORS_ORIGIN;

// Split the string into an array and trim whitespace from each domain.
// If the variable is not set, use an empty array as a fallback.
const productionOrigins = whitelistString 
    ? whitelistString.split(',').map(s => s.trim()) 
    : [];

// Define the final options
app.use(cors({
    origin: process.env.NODE_ENV === 'development'
        ? "http://localhost:3000" 
        : productionOrigins, // <-- This is now a clean array of strings
    credentials: true
}));

// here we're configuring the express to allow json requests with a certain limit
app.use(express.json({limit: "16kb"}))

// here we're configuring the express about how to take parameters as request from the user it should be encoded
app.use(express.urlencoded({extended : true, limit : '16kb'}))
app.use(express.static('public'))
// we use cookieParser to access the cookies from user's browser and to set those cookies

app.use(cookieParser())

app.use(morganMiddleware)


// routes imports
import userRouter from "./routes/user.route.js"
import saveTripRouter from "./routes/saved.route.js"
import searchRouter from './routes/search.route.js'




// register routers
app.use(`/api/v1/user`,userRouter);
app.use('/api/v1/saved',saveTripRouter)
app.use('/api/v1/search',searchRouter)





// Error handler should be the last middleware
app.use(errorHandler)




export {app}