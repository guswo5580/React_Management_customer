const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));

/////////////Database.json의 정보를 가져와 분석///////////////
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
//data를 불러오고 JSON을 통해 parsing 
const mysql = require('mysql');

/////////////Database와의 연결///////////////
const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});
connection.connect();

/////////////이미지 파일 저장을 위한 Multer 이용///////////////
const multer = require('multer');
const upload = multer({dest : './uploads'});
//저장할 위치 지정

app.use('/image', express.static('./uploads'));
//사용자는 image 폴더를 이용하지만, 실제로는 express 의 upload 폴더에 매핑이 됨


app.get('/api/customers' , (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted=0", 
        //isDeleted = 0 --- 삭제되지 않은 고객정보만!! 
        (err, rows, fields) => {
            res.send(rows);
        }
        //쿼리문 이용 basic structure
    );
});

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    
    //넘어온 데이터를 바탕으로 쿼리문에 params로 삽입
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];

    connection.query(sql, params, (err, rows, fields) => {
        //params 를 담아 전송할 때의 query connection
        res.send(rows);
        console.log(err)
    });
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id=?';
    let params = [req.params.id];

    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
        }    
    )
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});