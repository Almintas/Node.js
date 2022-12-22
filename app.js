const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const { response } = require('express');

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Kikitata147',
    database: 'shop',
    port: 3306
};

const connection = mysql.createConnection(mysqlConfig);

app.get('/products', (req, res) => {
    connection.execute('SELECT * FROM products', (err, products) => {
        res.send(products)
    });
});

app.post('/products', (req, res) => {
    const { title, price, stock } = req.body;

    connection.execute('INSERT INTO products (title, price, stock) VALUES(?, ?, ?)', [title, price, stock], (err, products) => {
        connection.execute('SELECT * FROM products', (err, products) => {
            res.send(products)
        });
    });
});

app.patch('/products/:id', (req, res) => {
    const { title, price, stock } = req.body;

    connection.execute('UPDATE products SET title=?, price=?, stock=?, WHERE id=?', [title, price, stock, req.params.id], (err, result) => {
        connection.execute('SELECT * FROM products', (err, result) => {
            res.send(result);
        });
    });
});

app.delete('/products/:id', (req, res) => {
    connection.execute('DELETE FROM products WHERE id=?', [req.params.id], (err, result) => {
        connection.execute('SELECT * FROM products', (err, result) => {
            res.send(result);
        });
    });
});

app.get('/sales', (req, res) => {
    connection.execute(
        `SELECT customers.id as customerid, sales.id as saleid, name amount as saleamount
        FROM sales 
        INNER JOIN customers 
        ON customers.id=sales.customerid;`,
        (err, result) => {
            connection.execute('SELECT * FROM sales', (err, result) => {
                res.send(result);
            });
        });
});

// app.post('/employees', (req, res) => {
//     connection.execute('INSERT INTO employees (name, salary) VALUES (?, ?)', [req.body.name, req.body.salary], (err, result) => {
//         connection.execute('SELECT * FROM employees', (err, result) =>{
//             res.send(result);
//         });
//     });
// });

// app.patch('/employees/:id', (req,res) => {
//     const { name } = req.body;

//     connection.execute('UPDATE employees SET name=? WHERE id=?', [name, req.params.id], (err, result) => {
//         connection.execute('SELECT * FROM employees', (err, result) => {
//             res.send(result);
//         });
//     });
// });

app.listen(3000, () => console.log('server is online'));