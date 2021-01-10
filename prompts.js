const inquirer = require('inquirer');

const promptToBegin = () => {
    return inquirer
        .prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'Purpose',
            choices: ['Manage Employees', 'Manage Managers', 'Manage Roles', 'Manage Departments', 'View Reports']
        }]);
};

module.exports = { promptToBegin };