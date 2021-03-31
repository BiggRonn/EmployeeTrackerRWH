CREATE DATABASE company_db;

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

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) UNIQUE NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) 
);

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (id)

);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES (Timothy, Aolee, 3, 13),(BOBB, werd, 3, 3),(David, wre, 3, 1),(Greg, Azxcv, 2, 1),(Paul, gdsage, 2, 1);

INSERT INTO roles(title, salary, department_id)
VALUES (3, "Manager", 150000, 1),(3, "Engineer", 50000, 1),(3, "Lawyer", 250000, 1);

INSERT INTO department(name)
VALUES("Administration"),("Technical"),("Legal"),("Sales");

SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name, roles.salary, employees.first_name AS Manager
FROM employees INNER JOIN roles
ON (employees.role_id = roles.id)
INNER JOIN department
ON(roles.department_id = department.id);




