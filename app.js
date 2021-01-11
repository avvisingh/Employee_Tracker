const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee_tracker'
});

connection.connect((err) => {
    if (err) throw err.stack;

    connection.query('SELECT * FROM employee', (error, results, fields) => {
        if (error) {
            console.log('Bad Request: ' + error.stack);
            return;
        }
        console.log(results);
    })
})
