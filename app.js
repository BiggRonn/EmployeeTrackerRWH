const mysql = require('mysql');
const inquirer = require("inquirer");
const myUtils = require("./lib/utils");
const connection = require("./lib/connection")




function init() {
  inquirer.prompt([{
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "Add Employee",
      "Add Department",
      "Add Role",
      "View Employees",
      "View Departments",
      "View Roles",
      "Update Employee Roles",
      "Exit"
    ]
  }]).then(function (response) {
    switch (response.action) {
      case "Add Employee":
        myUtils.addEmployee();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      case "View Employees":
        viewEmployees();
        break;
      case "View Departments":
        viewDepartments();
        break;
      case "View Roles":
        viewRoles();
        break;
      case "Update Employee Roles":
        updateEmployeeRole();
        break;
      default:
        connection.end();
    }
  })
}

init();