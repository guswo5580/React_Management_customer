const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }))

app.get('/api/customers' , (req, res) => {
    res.send([
        {
            id : 1,
            img : 'https://placeimg.com/64/64/1',
            name : '조현재',
            birthday : '940308',
            gender : '남',
            job : '학생'
        },{
            id : 2,
            img : 'https://placeimg.com/64/64/2',
            name : '조현재',
            birthday : '940308',
            gender : '남',
            job : '학생'
        },{
            id : 3,
            img : 'https://placeimg.com/64/64/3',
            name : '조현재',
            birthday : '940308',
            gender : '남',
            job : '학생'
      }
    ])
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});