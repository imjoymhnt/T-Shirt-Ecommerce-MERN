const express = require('express')
const app = express()


const admin = (req, res) => {
    res.send('Admin Dashboard')
}

const isAdmin = (req, res, next) => {
    console.log('Admin');
    next()
}

const isLoggedIn = (req, res, next) => {
    console.log('Logged In');
    next()
}


app.get('/admin', isLoggedIn, isAdmin, admin)

const port = 3000

app.listen(port, () => {
    console.log('Running');
})