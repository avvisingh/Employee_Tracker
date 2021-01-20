const inquirer = require('inquirer');

//This function retrieves the employee first name. The returned value used in addEmployee()
const fetchEmployeeFirstName = () => {
    return inquirer.prompt([{
        type: "input",
        name: "FirstName",
        message: "What is the First Name of the employee you wish to add?",
        validate: (input) => {
            if (!input) throw new Error('First Name cannot be left empty!');
            if (! /^[a-zA-Z0-9]+$/.test(input)) throw new Error("Please enter a valid name with text only!"); 

            return true;
        }
    }])
}

//This function retrieves the employee last name. The returned value is used in addEmployee()
const fetchEmployeeLastName = () => {
    return inquirer.prompt([{
        type: "input",
        name: "LastName",
        message: "What is the Last Name of the employee you wish to add?",
        validate: (input) => {
            if (!input) throw new Error('Last Name cannot be left empty!');
            if (! /^[a-zA-Z0-9]+$/.test(input)) throw new Error("Please enter a valid name with text only!"); 

            return true;
        }
    }])
}

//This function retrieves the employee role-id. The returned value is used in addEmployee()
const fetchEmployeeRole = () => {
    return inquirer.prompt([{
        type: "number",
        name: "Role",
        message: "What is the Role Id of the employee you wish to add?"
    }])
}

//This function retrieves the employee's manager's id'. The returned value is used in addEmployee()
const fetchEmployeeManager = () => {
    return inquirer.prompt([{
        type: "number",
        name: "EmployeeManager",
        message: "Please input the Id of the Employee's Manager"
    }])
}

const employeeToUpdate = () => {
    return inquirer.prompt([{
        type: "number",
        name: "RoleID",
        message: "Please enter the Employee id for the employee whose Role you'd like to update"
    }])
}

const roleToUpdateTo = () => {
    return inquirer.prompt([{
        type: "number",
        name: "newRoleID",
        message: "Please enter the new Role id for this Employee"
    }])
}

module.exports = {
    fetchEmployeeFirstName,
    fetchEmployeeLastName,
    fetchEmployeeRole,
    fetchEmployeeManager,
    employeeToUpdate,
    roleToUpdateTo
}