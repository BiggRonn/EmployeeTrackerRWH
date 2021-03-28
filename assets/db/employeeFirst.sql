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

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES (Timothy, Aolee, 3, 13);

INSERT INTO roles(role_id, title, salary, department_id)
VALUES (3, "Manager", 150,000, 1);

INSERT INTO department(name)
VALUES(1, "Administration");