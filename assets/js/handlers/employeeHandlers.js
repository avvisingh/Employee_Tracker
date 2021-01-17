const connection = require('../../../connection');
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const employeeOperationType = () => {
    return inquirer.prompt([{
        type: "list",
        name: "manageEmployees",
        message: "How would you like to manage Employees",
        choices: ["View All Employees", "Add Employee", "Update Employee Roles"]
    }])
}

const viewAllEmployees = () => {
    let query = 'SELECT id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name" FROM employee';

    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops! An error has occurred!' + error.stack);
        }

        console.log("\n");
        console.table(results);
    })
}

module.exports = {
    viewAllEmployees
}