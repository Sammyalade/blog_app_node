const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
const {Pool} = require('pg');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '08027146369Aos@@@',
    database: 'blog_app'
});

const anotherPool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '08027146369Aos@@@',
    database: 'blog_app',
    port: 5432
})

anotherPool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to PostgreSQL', err);
        return;
    }
    console.log('Connected to PostgreSQL');
    release();
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL', err);
        return;
    }
    console.log('Connected to MySQL');
    connection.release();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 8500;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));