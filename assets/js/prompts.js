const inquirer = require('inquirer');
const connection = require('../../connection');

const initPrompt = () => {
    return inquirer.prompt([{
        type: "list",
        name: "likeToDo",
        message: "What would you like to do?",
        choices: ["Manage Departments", "Manage Employees", "Manage Roles", "View Reports", "Exit the Application - I'm done"]
    }]);
}

const beginPrompt = async () => {
    let resultTest = await initPrompt();
    let userChoice = resultTest.likeToDo;

    switch (userChoice) {
        case "Manage Departments":
            console.log('User would like to Manage Departments');
            break;
        case "Manage Employees":
            console.log('User would like to Manage Employees');
            employeeOperationExecutor()
            break;
        case "Manage Roles":
            console.log('User would like to Manage Roles');
            break;
        case "View Reports":
            console.log('User would like to View Reports');
            break;
        case "Exit the Application - I'm done":
            console.log('User would like to Exit');
    }
}

//This function asks the user how they would like to manager employees
const employeeOperationType = () => {
    return inquirer.prompt([{
        type: "list",
        name: "manageEmployees",
        message: "How would you like to manage Employees",
        choices: ["View All Employees", "Add Employee", "Update Employee Roles"]
    }])
}

//This function executes the appropriate function based on the user's response to employeeOperationType()
const employeeOperationExecutor = async () => {
    let employeeOperationSelectedPromise = await employeeOperationType();
    let employeeOperationSelected = employeeOperationSelectedPromise.manageEmployees;

    switch (employeeOperationSelected) {
        case "View All Employees":
            await viewAllEmployees();
            break;
        case "Add Employee":
            await addEmployee();
            break;
        case "Update Employee Roles":
            await updateEmployeeRole();
    }
}

//This function is used to make an SQL query and view all of the employees in the "employee" table
const viewAllEmployees = () => {
    let query = 'SELECT id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name" FROM employee';

    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops! An error has occurred!' + error.stack);
        }

        console.log("\n");
        console.table(results);
        beginPrompt();
    })
}

//This function consolidates the information fetched from the user and then uses it in a query to add an employee to the "employee" table
const addEmployee = async () => {
    let firstNamePromise = await fetchEmployeeFirstName();
    let firstName = firstNamePromise.FirstName;

    let lastNamePromise = await fetchEmployeeLastName();
    let lastName = lastNamePromise.LastName;

    let rolePromise = await fetchEmployeeRole();
    let employeeRole = rolePromise.Role;

    let employeeManagerPromise = await fetchEmployeeManager();
    let employeeManager = employeeManagerPromise.EmployeeManager;

    if (Number.isNaN(employeeRole)) {
        employeeRole = null;
    }

    if (Number.isNaN(employeeManager)) {
        employeeManager = null;
    }

    let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${employeeRole}, ${employeeManager})`;
    
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops! An error has occurred!' + error.stack);
        }

        console.log("\n");
        console.log('Your employee was successfully added!');
        beginPrompt();
    })
}

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

const updateEmployeeRole = async () => {
    let employeeIDPromise = await employeeToUpdate();
    let employeeID = employeeIDPromise.RoleID;
    
    let newRoleIDPromise = await roleToUpdateTo();
    let newRoleID = newRoleIDPromise.newRoleID;

    let query = `UPDATE employee SET role_id = ${newRoleID} WHERE id = ${employeeID}`

    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops! An error has occurred!' + error.stack);
        }

        console.log("\n");
        console.log("Your employee's Role id was successfully updated");
        beginPrompt();
    })
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
    beginPrompt,
    employeeOperationExecutor,
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole
}



