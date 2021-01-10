const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee_tracker'
});

const pool = mysql.createPool(connection);

connection.connect((err) => {
    if (err) {
        console.log('could not connect: ' + err.stack)
    }

    console.log('connected as id ' + connection.threadId);
});