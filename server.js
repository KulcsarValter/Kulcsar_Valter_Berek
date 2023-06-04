// --middleware deklarálás (beépülő modulok)
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const express = require('express');
const app = express();
//--pontosítjuk a middleware-ket
app.use(express.static(path.join(__dirname, 'masik')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'berek'
    }
);
connection.connect();

//--Végpontok megadása
/**
 * Gyökér könyvtár jelzése
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'masik', 'masik.html'));
})

app.get('/dolgozok', (req, res) => {
    let sql = "SELECT * FROM berek";
    
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(rows);
            res.end();
        }
    });
})

app.listen(3000, () => {
    console.log('Szerver indítva a 3000-es porton');
})
