const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'stephi'
});

db.connect();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/login', (req, res) => {
    const { email, password } = req.query;
    const QUERY_LOGIN = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`
    db.query(QUERY_LOGIN, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json(result)
        }
    })
})

app.get('/api/createacc', (req, res) => {
    const { name, lastname, email, password, type, dateN } = req.query;
    const QUERY_CREATEACC = `INSERT INTO user (name, lastname, email, password, type, dateN) VALUES('${name}', '${lastname}', '${email}', '${password}', '${type}', '${dateN}')`
    db.query(QUERY_CREATEACC, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json(result)
        }
    })
})

app.get('/api/user', async (req,res) => {
    var sql = 'SELECT * FROM user';
    db.query(sql, (err, result)=>{
    if(err) throw err;
    res.json(result);
});
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
