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

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('/api/user', async (req,res) => {
    var sql = 'SELECT * FROM user';
    db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
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
