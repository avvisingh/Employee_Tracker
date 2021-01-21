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

const fetchDepartmentToUpdateId = () => {
    return inquirer.prompt([{
        type: "number",
        name: "departmentToUpdateid",
        message: "Please enter the id of the department you wish to change names for"
    }])
}

const newDepartmentName = () => {
    return inquirer.prompt([{
        type: "input",
        name: "newDepartmentName",
        message: "Please enter the new name for this department"
    }])
}

const departmentToDelete = () => {
    return inquirer.prompt([{
        type: "number",
        name: "departmentToDelete",
        message: "Please enter the id of the department you wish to remove"
    }])
}

module.exports = {
    fetchDepartmentName,
    fetchDepartmentToUpdateId,
    newDepartmentName,
    departmentToDelete
}