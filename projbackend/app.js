require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

const app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DB CONNECTED');
})
.catch(() => {
    console.log("ERROR! WHILE CONNECTING TO THE DATABASE");
})
// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Route middlewares
app.use('/api', authRoutes)
app.use("/api", userRoutes)

app.get('/', (req, res) => {
    res.send('Hello')
})



const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})