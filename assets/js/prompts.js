const inquirer = require('inquirer');
const connection = require('../../connection');
const employeePrompts = require('./employeePrompts');
const departmentPrompts = require('./departmentPrompts');

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
            departmentOperationExecutor();
            break;
        case "Manage Employees":
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
    let query = 'SELECT id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name", role_id  AS "Role ID", manager_id AS "Manager ID" FROM employee';

    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops! An error has occurred!' + error.sqlMessage || error.stack);
        }

        console.log("\n");
        console.table(results);
        beginPrompt();
    })
}

//This function consolidates the information fetched from the user and then uses it in a query to add an employee to the "employee" table
const addEmployee = async () => {
    let firstNamePromise = await employeePrompts.fetchEmployeeFirstName();
    let firstName = firstNamePromise.FirstName;

    let lastNamePromise = await employeePrompts.fetchEmployeeLastName();
    let lastName = lastNamePromise.LastName;

    let rolePromise = await employeePrompts.fetchEmployeeRole();
    let employeeRole = rolePromise.Role;

    let employeeManagerPromise = await employeePrompts.fetchEmployeeManager();
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
            return console.log('Oops! An error has occurred!' + error.sqlMessage || error.stack);
        }

        console.log("\n");
        console.log('Your employee was successfully added!');
        beginPrompt();
    })
}

const updateEmployeeRole = async () => {
    let employeeIDPromise = await employeePrompts.employeeToUpdate();
    let employeeID = employeeIDPromise.RoleID;
    
    let newRoleIDPromise = await employeePrompts.roleToUpdateTo();
    let newRoleID = newRoleIDPromise.newRoleID;

    let query = `UPDATE employee SET role_id = ${newRoleID} WHERE id = ${employeeID}`

    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops! An error has occurred!' + error.sqlMessage || error.stack);
        }

        console.log("\n");
        console.log("Your employee's Role id was successfully updated");
        beginPrompt();
    })
}

const departmentOperationType = () => {
    return inquirer.prompt([{
        type: "list",
        name: "manageDepartments",
        message: "How would you like to manage Departments",
        choices: ["View All Departments", "Add Department", "Change Department Name", "Delete Department"]
    }])
}

const departmentOperationExecutor = async () => {
    let departmentOperationSelectedPromise = await departmentOperationType();
    let departmentOperationSelected = departmentOperationSelectedPromise.manageDepartments;

    switch (departmentOperationSelected) {
        case "View All Departments":
            viewAllDepartments();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Change Department Name":
            updateDepartmentName();
            break;
        case "Delete Department":
            deleteDepartment();
    }
}

const viewAllDepartments = () => {
    let query = 'SELECT * FROM department';

    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops, an error has occurred!' + error.sqlMessage || error.stack);
        }

        console.table(results);
        beginPrompt();
    })
}

const addDepartment = async () => {
    let departmentNamePromise = await departmentPrompts.fetchDepartmentName();
    let departmentName = departmentNamePromise.departmentName;

    let query = `INSERT INTO department (name) VALUES ("${departmentName}")`

    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops, something went wrong! ' + error.sqlMessage || error.stack);
        }

        console.log('Your department has successfully been added.');
        console.log('\n');
        beginPrompt();
    })
}

const updateDepartmentName = async () => {
    let departmentToUpdateIdPromise = await departmentPrompts.fetchDepartmentToUpdateId();
    let departmentToUpdateId = departmentToUpdateIdPromise.departmentToUpdateid;

    let newDepartmentNamePromise = await departmentPrompts.newDepartmentName();
    let newDepartmentName = newDepartmentNamePromise.newDepartmentName;

    let query = `UPDATE department SET name = "${newDepartmentName}" WHERE id = ${departmentToUpdateId}`

    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops, something went wrong! ' + error.sqlMessage || error.stack);
        }

        console.log('Your department name has been changed!');
        console.log('\n');
        beginPrompt();
    })
}

const deleteDepartment = async () => {
    let departmentToDeletePromise = await departmentPrompts.departmentToDelete();
    let departmentToDelete = departmentToDeletePromise.departmentToDelete;

    let query = `DELETE FROM department WHERE id = ${departmentToDelete}`;

    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.log('Oops, something went wrong! ' + error.sqlMessage || error.stack)
        }

        console.log('Your specified department has successfully been removed!');
        console.log('\n');
        beginPrompt();
    })
}

const roleOperationType = () => {
    return inquirer.prompt([{
        type: "list",
        name: "manageRoles",
        message: "How would you like to manage Roles",
        choices: ["View All Roles", "Add Role", "Change Role Name", "Delete Role"]
    }])
}

const employeeOperationExecutor = async () => {
    let roleOperationSelectedPromise = await roleOperationType();
    let roleOperationSelected = roleOperationSelectedPromise.manageRoles;

    switch (roleOperationSelected) {
        case "View All Roles":
            console.log('The user would like to View All Roles');
            break;
        case "Add Role":
            console.log('The user would like to Add Role');
            break;
        case "Change Role Name":
            console.log('The user would like to Change Role Name');
            break;
        case "Delete Role":
            console.log('Delete Role');
    }
}

module.exports = {
    beginPrompt
}



