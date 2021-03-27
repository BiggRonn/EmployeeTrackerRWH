CREATE DATABASE company_db;

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY id,
    

);

CREATE TABLE roles(
    id INT NOT NULL,
    title VARCHAR(255),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY id 
);

CREATE TABLE department(
    id INT NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY id

);

INSERT INTO employees (firstName, lastName, roleID, managerID);

INSERT INTO roles(roleID, title, salary, department_id);

INSERT INTO department(id, name);