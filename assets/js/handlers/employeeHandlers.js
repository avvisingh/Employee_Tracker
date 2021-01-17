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

const addEmployee = async () => {
    let firstNamePromise = await fetchEmployeeFirstName();
    let firstName = firstNamePromise.FirstName;
    let lastNamePromise = await fetchEmployeeLastName();
    let lastName = lastNamePromise.LastName;

    console.log(firstName, lastName);
}

const fetchEmployeeFirstName = () => {
    return inquirer.prompt([{
        type: "input",
        name: "FirstName",
        message: "What is the First Name of the employee you wish to add?"
    }])
}

const fetchEmployeeLastName = () => {
    return inquirer.prompt([{
        type: "input",
        name: "LastName",
        message: "What is the Last Name of the employee you wish to add?"
    }])
}

module.exports = {
    viewAllEmployees,
    addEmployee
}