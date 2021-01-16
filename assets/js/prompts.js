const inquirer = require('inquirer');

const initPrompt = () => {
    return inquirer.prompt([{
        type: "list",
        name: "likeToDo",
        message: "What would you like to do?",
        choices: ["Manage Departments", "Manage Employees", "Manage Roles", "View Reports", "Exit the Application - I'm done"]
    }]);
}

module.exports = {
    initPrompt
}

