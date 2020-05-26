const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const mysql = require('mysql');
const app = express();
const fileUpload = require('express-fileupload');


const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'stephi'
});

db.connect();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(fileUpload());

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

app.get('/api/agence', (req, res) => {
    const QUERY_AGENCE = `SELECT * FROM agence`
    db.query(QUERY_AGENCE, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json(result)
        }
    })
})

app.get('/api/annonces', (req, res) => {
    const { id } = req.query;
    const QUERY_ANNONCES = `SELECT * FROM annonces WHERE idagence = '${id}'`
    db.query(QUERY_ANNONCES, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json(result)
        }
    })
})

app.get('/api/userannonces', (req, res) => {
    const { id } = req.query;
    const QUERY_USERANNONCES = `SELECT * FROM annonces WHERE iduser = '${id}'`
    db.query(QUERY_USERANNONCES, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json(result)
        }
    })
})

app.get('/api/annonce', (req, res) => {
    const { id } = req.query;
    const QUERY_ANNONCE = `SELECT * FROM annonces WHERE idannonce = '${id}'`
    db.query(QUERY_ANNONCE, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json(result)
        }
    })
})

app.post('/upload', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});

app.get('/api/postimage', (req, res) => {
    const { idannonce, photo } = req.query;
    const QUERY_POSTIMAGE = `INSERT INTO photos (idannonce, photo) VALUES('${idannonce}', '${photo}')`
    db.query(QUERY_POSTIMAGE, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json(result)
        }
    })
})

app.get('/api/annonceimg', (req, res) => {
    const { id } = req.query;
    const QUERY_ANNONCEIMG = `SELECT * FROM photos WHERE idannonce = '${id}'`
    db.query(QUERY_ANNONCEIMG, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json(result)
        }
    })
})

app.get('/api/updateprofil', (req, res) => {
    const { id, name, lastname, email, password  } = req.query;
    const QUERY_UPDATEPROFILE = `UPDATE user set name = '${name}', lastname = '${lastname}', email = '${email}', password = '${password}' WHERE iduser = '${id}'`
    db.query(QUERY_UPDATEPROFILE, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            return res.json(result)
        }
    })
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
