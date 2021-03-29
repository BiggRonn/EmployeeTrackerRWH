const mysql = require('mysql');
const inquirer = require("inquirer");
const util = require("./lib/utils");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'root',
  database: 'company_db',
});



connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);

  init();
});

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
        util.addEmployee();
        break;
      case "Add Department":
        util.addDepartment();
        break;
      case "Add Role":
        util.addRole();
        break;
      case "View Employees":
        util.viewEmployees();
        break;
      case "View Departments":
        util.viewDepartments();
        break;
      case "View Roles":
        util.viewRoles();
        break;
        case "Update Employee Roles":
        util.updateEmployeeRole();
        break;
      default:
        connection.end();
    }
  })
}




