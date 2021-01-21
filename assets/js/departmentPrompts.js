const inquirer = require('inquirer');

const fetchDepartmentName = () => {
    return inquirer.prompt([{
        type: "input",
        name: "departmentName",
        message: "What is the name of the Department you would like to add?",
        validate: (input) => {
            if (!input) throw new Error('Department Name cannot be left empty!');
            if (! /^[a-zA-Z0-9]+$/.test(input)) throw new Error("Please enter a valid Department name with text only!"); 

            return true;
        }
    }])
}

module.exports = {
    fetchDepartmentName
}