const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes')
const app = express()
app.set('port', process.env.PORT || 9000)

const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'sakila'
}


// MIDDELWARES---------------------------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

// ROUTES---------------------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
    console.log(dbOptions)
})

app.use('/sakila', routes)

// SERVER RUNNING---------------------------------------------------------
app.listen(app.get('port'), () => {
    console.log('Server running on port: ', app.get('port'))
});