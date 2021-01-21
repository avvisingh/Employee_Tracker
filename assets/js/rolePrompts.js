const inquirer = require('inquirer');

const fetchRoleName = () => {
    return inquirer.prompt([{
        type: "input",
        name: "newRoleName",
        message: "Please enter the name of the Role"
    }])
}

const fetchRoleSalary = () => {
    return inquirer.prompt([{
        type: "number",
        name: "newRoleSalary",
        message: "Please enter the annual salary of the indidivual in this role"
    }])
}

const fetchRoleDepartmentId = () => {
    return inquirer.prompt([{
        type: "number",
        name: "newRoleDepartment",
        message: "Please enter the id of the Department this Role is in. (Leave empty if not specific to a Department)"
    }])
}

const fetchRoleID = () => {
    return inquirer.prompt([{
        type: "number",
        name: "roleID",
        message: "Please enter the id of the Role you'd like to action",
        validate: (input) => {
            if (!input) throw new Error("You need to enter the ID of the Role");

            return true;
        }
    }])
}

module.exports = {
    fetchRoleName,
    fetchRoleSalary,
    fetchRoleDepartmentId,
    fetchRoleID
}