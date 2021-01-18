const mysql = require('mysql');
const prompts = require('./assets/js/prompts');
const employeeHandler = require('./assets/js/handlers/employeeHandlers');
const connection = require('./connection');

connection.connect((err) => {
    if (err) throw err.stack;

    prompts.beginPrompt();
});
