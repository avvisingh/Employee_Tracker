const prompts = require('./assets/js/prompts');
const connection = require('./connection');

connection.connect((err) => {
    if (err) throw err.stack;

    prompts.beginPrompt();
});
