CREATE DATABASE company_db;

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT NOT NULL,
    manager_id INT

);

CREATE TABLE roles(
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(255),
    salary DECIMAL,
    department_id INT 
);

CREATE TABLE department(
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(255)

);
