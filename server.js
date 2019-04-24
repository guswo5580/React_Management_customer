const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest : './uploads'});

app.get('/api/customers' , (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER", 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./uploads'));
//사용자는 image 폴더를 이용하지만, 실제로는 express 의 upload 폴더에 매핑이 됨
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    
    let params = [image, name, birthday, gender, job];
    //sql문의 빈칸을 params으로 담아 보냄

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err)
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});