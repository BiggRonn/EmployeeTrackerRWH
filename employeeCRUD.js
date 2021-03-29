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
        addEmployee();
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

function updateEmployeeRole(){
  inquirer.prompt([{
    type: "input",
    name: "empID",
    message: "What is the employee's ID?"
  },
  {
    type: "input",
    name: "newRole",
    message: "What role would you like this employee to have?"
  }]).then(function(response){
    const query = "UPDATE employees SET role_id = (?) WHERE id = (?)";

    connection.query(query, [response.newRole, response.empID]);

    init();
  })

}


function viewEmployees() {
  connection.query("SELECT * FROM employees", function (err, data) {
    console.table(data);
    init();
  });
}
function viewDepartments() {
  connection.query("SELECT * FROM departments", function (err, data) {
    console.table(data);
    init();
  });
}
function viewRoles() {
  connection.query("SELECT * FROM roles", function (err, data) {
    console.table(data);
    init();
  });
}

function addEmployee() {
  inquirer.prompt([{
    type: "input",
    name: "firstName",
    message: "What is the employee's first name?"
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the employee's last name?"
  },
  {
    type: "input",
    name: "roleID",
    message: "What is the employee's role?"
  }, {
    type: "input",
    name: "managerID",
    message: "Who is the employee's manager?"
  }]).then(function (response) {
    console.log(response);
    const query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";

    const foo = connection.query(query, [response.firstName, response.lastName, response.roleID, response.managerID], function (err, data) {
      console.log("Added employee", response.lastName);
      console.log(foo.sql);
      init();
    })
  })
}
function addRole() {
  inquirer.prompt([{
    type: "input",
    name: "title",
    message: "What is the title of the role?"
  }
  {
    type: "input",
    name: "salary",
    message: "What is the salary?"
  }, {
    type: "input",
    name: "departmentID",
    message: "What is the departmentID?"
  }]).then(function (response) {
    console.log(response);
    const query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);";

    const foo = connection.query(query, [response.title, response.salary, response.departmentID], function (err, data) {
      console.log("Added role", response.title);
      console.log(foo.sql);
      init();
    })
  })
}

function addDepartment() {
  inquirer.prompt([{
    type: "input",
    name: "name",
    message: "What is the name of the department?"
  }]).then(function (response)){
    const query = "INSERT INTO department (name) VALUES (?);";
    const foo = connection.query(query, [response.name]);
    console.log("Added department", response.name);
    init();
  }


}


