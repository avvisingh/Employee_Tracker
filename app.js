const mysql = require('mysql');
const prompts = require('./assets/js/prompts');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee_tracker'
});

// connection.connect((err) => {
//     if (err) throw err.stack;


// });

const firstPrompt = async () => {
    let resultTest = await prompts.initPrompt();
    let userChoice = resultTest.likeToDo;

    switch (userChoice) {
        case "Manage Departments":
            console.log('User would like to Manage Departments');
            break;
        case "Manage Employees":
            console.log('User would like to Manage Employees');
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

firstPrompt();