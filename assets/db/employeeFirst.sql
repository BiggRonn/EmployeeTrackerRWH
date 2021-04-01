DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (id)

);
CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) UNIQUE NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) 
);
CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT NOT NULL ,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
    

);

INSERT INTO department(name)
VALUES("Administration"),("Technical"),("Legal"),("Sales");

INSERT INTO roles(title, salary, department_id)
VALUES ("CEO", 2550000, 1),("Engineer", 100000, 2),("Lawyer", 250000, 3),("Sales Lead", 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Timothy", "Aolee", 1, null),("Bob","Werd", 3, 1),("Ahmed", "Perry", 3, 1),("Greg", "Azerces", 2, 2),("Paul", "Dinsage", 2, 2);



SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name, roles.salary, employees.first_name AS Manager
FROM employees INNER JOIN roles
ON (employees.role_id = roles.id)
INNER JOIN department
ON(roles.department_id = department.id);




