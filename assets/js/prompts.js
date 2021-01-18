const inquirer = require('inquirer');
const employeeHandler = require('./handlers/employeeHandlers');

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
            employeeHandler.employeeOperationExecutor()
            .then(() => {
                beginPrompt();
            })
            .catch((err) => {
                console.log('Oops! Something went wrong!');
            })
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

const flowController = new Promise((resolve, reject) => {

})

module.exports = {
    beginPrompt
}



