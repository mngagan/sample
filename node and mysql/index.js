const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const Select_All_Query = 'select * from product';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    database : 'products',
    port : 3306
});

connection.connect(err => {
    if(err){
        return err;
    }
});
console.log(connection);

app.get('/', (req, res) => {
    res.send('hello /products to see product')
});

app.get('/product/add', (req, res) => {
    console.log('in product, addddd');
    console.log(res);
    const {task_id, task_name} = req.query;
    res.setHeader('Content-Type', 'text/plain');
    console.log(task_id, task_name);
    const insert_quey = "INSERT INTO tasklist (task_name, status) VALUES ('task2' , 'new task');select last_insert_id();"
    connection.query(insert_quey, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else{
//            connection.query(select last_inserted_id(), (err, results)
            return res.send('added product')
        }
    });
//    res.send('hello in products... '+task_id +' ... '+ task_name + '.dasdsdas..')
});

app.get('/product', (req, res) => {
    connection.query(Select_All_Query, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else{
            return res.json({
                data:results
            })
        }
    });
//    res.send('hello in products')
});

app.use(cors());

app.listen(4000, () => {
    console.log('listening on -- port 4000');
});
