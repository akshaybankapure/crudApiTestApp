"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createMultipleEmployees = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployees = exports.createEmployeeValidation = void 0;
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
// Validation middleware for createEmployee route
const createEmployeeValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.createEmployeeValidation = createEmployeeValidation;
const employees = [];
// Get all employees
const getAllEmployees = (req, res) => {
    try {
        res.status(200).json(employees);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllEmployees = getAllEmployees;
// Get employee by ID
const getEmployeeById = (req, res) => {
    try {
        const empId = req.params.empId;
        const employee = employees.find(emp => emp.employeeId === empId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getEmployeeById = getEmployeeById;
// Create a new employee
const createEmployee = (req, res) => {
    try {
        const { employeeName, age, salaryAmount, email, degreeDetails } = req.body;
        // Generate a unique employeeId
        const employeeId = (0, uuid_1.v4)().toString(); //converting to string as employeeId must be alpha numeric string acc to requirements
        const newEmployee = {
            employeeId,
            employeeName,
            age,
            salaryAmount,
            email,
            degreeDetails,
        };
        // Save the newEmployee object to the database or in-memory storage
        employees.push(newEmployee);
        res.status(201).json({ message: 'Employee created successfully!', employee: newEmployee });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createEmployee = createEmployee;
// Create multiple employees
const createMultipleEmployees = (req, res) => {
    try {
        const newEmployees = req.body;
        // Generate unique employeeIds and add new employees to the array
        newEmployees.forEach(newEmployee => {
            newEmployee.employeeId = (0, uuid_1.v4)().toString();
            employees.push(newEmployee);
        });
        res.status(201).json({ message: 'Employees created successfully!', employees: newEmployees });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createMultipleEmployees = createMultipleEmployees;
// Update an existing employee
const updateEmployee = (req, res) => {
    try {
        const empId = req.params.empId;
        const updatedEmployee = req.body;
        const employeeIndex = employees.findIndex(emp => emp.employeeId === empId);
        if (employeeIndex === -1) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        // Update employee details
        employees[employeeIndex] = { ...employees[employeeIndex], ...updatedEmployee };
        res.status(200).json(employees[employeeIndex]);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateEmployee = updateEmployee;
// Delete an employee
const deleteEmployee = (req, res) => {
    try {
        const empId = req.params.empId;
        const employeeIndex = employees.findIndex(emp => emp.employeeId === empId);
        if (employeeIndex === -1) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        // Remove employee from the list
        employees.splice(employeeIndex, 1);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteEmployee = deleteEmployee;
