const express = require('express')
const mysql = require('mysql')
const routes = require('./routes')

const myconn = require('express-myconnection')
const dbOptions = {
    host: 'localhost',
    port: 3306,
    use: 'root',
    password: '',
    database: 'library'
}

const app = express()
app.set('port', process.env.PORT || 9000)

// MIDDELWARES---------------------------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))

// ROUTES---------------------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})

app.use('/api', routes)

// SERVER RUNNING---------------------------------------------------------
app.listen(app.get('port'), () => {
    console.log('Server running on port: ', app.get('port'))
});