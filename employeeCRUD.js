const mysql = require('mysql');
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'root',
  database: 'employee_db',
});



connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);

  init();
});

function init(){
  inquirer.prompt([{
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "Add Employees",
      "Add Departments",
      "Add Roles",
      "View Employees",
      "View Departments",
      "View Roles",
      "Update Employee Roles",
      "Exit"
    ]
  }]).then(function(response){
    switch(response.action){
      case "Add Employees":
        addEmployee();
        break;
      case "Add Departments":
        addDepartment();
        break;
      default:
        connection.end();
    }
  })
}


function viewFlavors(){
  connection.query("SELECT * FROM products", function(err, data){
    console.table(data);
    init();
  })
}

function addEmployee(){
  inquirer.prompt([{
    type: "input",
    name: "firstName",
    message: "What is the employee's first name?"
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the employee's last name?"
  }
  {
    type: "input",
    name: "roleID",
    message: "What is the employee's role?"
  },{
    type: "input",
    name: "managerID",
    message: "Who is the employee's manager?"
  }]).then(function(response){
    console.log(response);
    const query = "INSERT INTO employees (first_name, last_name, roleID, managerID) VALUES (?, ?, ?, ?);";

    const foo = connection.query(query, [response.firstName, response.lastName, response.roleID, response.managerID], function(err, data){
      console.log("Added employee", response.lastName);
      console.log(foo.sql);
      init();
    })
  })
}
