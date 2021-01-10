const mysql = require('mysql');
const inquirer = require('inquirer');
const promptToBegin = require('./prompts');

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
});

let testing = async () => {
    let value = await promptToBegin.promptToBegin();
    console.log('Console logged: ' + value.Purpose);
}

testing();