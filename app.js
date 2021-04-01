const mysql = require('mysql');
const inquirer = require("inquirer");

const util = require("util");

//const {connection} = require("./lib/connection")
// const{
//   updateEmployeeRole,
//   addEmployee,
//   addRole,
//   addDepartment,
//   viewEmployees,
//   viewRoles,
//   viewDepartments
// } = require("./lib/utils");




const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'company_db',
});



connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

connection.query = util.promisify(connection.query);


async function init() {
  const response = await inquirer.prompt([{
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

const rQuestions = [{
  type: "input",
  name: "title",
  message: "What is the title of the role?"
},
{
  type: "input",
  name: "salary",
  message: "What is the salary?"
}, {
  type: "list",
  name: "department",
  message: "What is the department?",
  choices: []
}]


const eQuestions = [{
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
  type: "list",
  name: "roleID",
  message: "What is the employee's role?",
  choices: []
}, {
  type: "list",
  name: "managerID",
  message: "Who is the employee's manager?",
  choices: []
}]

const updateQ = [{
  type: "list",
  name: "empID",
  message: "Which employee would you like to update?",
  choices: []
},
{
  type: "list",
  name: "newRole",
  message: "What role would you like this employee to have?",
  choices: []
}]



//get this to work with employee name.
async function updateEmployeeRole() {
  const eList = await connection.query("SELECT * FROM employees;");
  updateQ[0].choices = await eList.map((x) => ({ name: x.first_name, value: x.id }));

  const roleList = await connection.query("SELECT * FROM roles;");
  updateQ[1].choices = await roleList.map((x) => ({ name: x.title, value: x.id }));


  await inquirer.prompt(updateQ).then(function (response) {
    const query = "UPDATE employees SET role_id = (?) WHERE id = (?)";

    connection.query(query, [response.newRole, response.empID]);

    init();
  })

}


async function viewEmployees() {
  await connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name AS department, roles.salary
  FROM employees INNER JOIN roles
  ON (employees.role_id = roles.id)
  INNER JOIN department
  ON(roles.department_id = department.id);`, function (err, data) {
    console.table(data);
    init();
  });
}
async function viewDepartments() {
  await connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    init();
  });
}
async function viewRoles() {
  await connection.query("SELECT * FROM roles", function (err, data) {
    console.table(data);
    init();
  });
}

async function addEmployee() {

  const roleList = await connection.query("SELECT * FROM roles;");


  const mList = await connection.query("SELECT * FROM employees;");
  

  eQuestions[2].choices = await roleList.map((x) => ({ name: x.title, value: x.id }));

  eQuestions[3].choices = await mList.map((x) => ({ name: x.first_name, value: x.id }));


  await inquirer.prompt(eQuestions).then(function (response) {
    
    const query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";

    const foo = connection.query(query, [response.firstName, response.lastName, response.roleID, response.manager])
    console.log("Added employee", response.lastName);
   
    init();

  })
}

async function addRole() {
  const departmentList = await connection.query("SELECT * FROM department;");
  rQuestions[2].choices = departmentList.map(x => ({ name: x.name, value: x.id }));

  await inquirer.prompt(rQuestions)
    .then(function (response) {
      console.log(response);
      const query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);";

      // const dID = connection.query("SELECT department.id FROM department WHERE name = (?);", response.departmentID)
      // .then(console.log(dID));

      const foo = connection.query(query, [response.title, response.salary, response.department], function (err, data) {
        console.log("Added role", response.title);

        init();
      })
    })
}


async function addDepartment() {
  await inquirer.prompt([{
    type: "input",
    name: "name",
    message: "What is the name of the department?"
  }]).then(function (response) {
    const query = "INSERT INTO department (name) VALUES (?);";
    const foo = connection.query(query, [response.name]);
    console.log("Added department", response.name);
    init();
  })


}

init();