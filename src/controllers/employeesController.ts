import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import Employee from 'models/employeeModel';

// Validation middleware for createEmployee route
export const createEmployeeValidation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const employees: Employee[] = [];

// Get all employees
export const getAllEmployees = (req: Request, res: Response) => {
  try {
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get employee by ID
export const getEmployeeById = (req: Request, res: Response) => {
  try {
    const empId = req.params.empId;
    const employee = employees.find(emp => emp.employeeId === empId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new employee
export const createEmployee: RequestHandler = (req, res) => {
  try {
    const { employeeName, age, salaryAmount, email, degreeDetails } = req.body;

    // Generate a unique employeeId
    const employeeId = uuidv4().toString(); //converting to string as employeeId must be alpha numeric string acc to requirements

    const newEmployee: Employee = {
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

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create multiple employees
export const createMultipleEmployees: RequestHandler = (req, res) => {
  try {
    const newEmployees: Employee[] = req.body;

    // Generate unique employeeIds and add new employees to the array
    newEmployees.forEach(newEmployee => {
      newEmployee.employeeId = uuidv4().toString();
      employees.push(newEmployee);
    });

    res.status(201).json({ message: 'Employees created successfully!', employees: newEmployees });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing employee
export const updateEmployee = (req: Request, res: Response) => {
  try {
    const empId = req.params.empId;
    const updatedEmployee: Employee = req.body;
    const employeeIndex = employees.findIndex(emp => emp.employeeId === empId);

    if (employeeIndex === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Update employee details
    employees[employeeIndex] = { ...employees[employeeIndex], ...updatedEmployee };
    res.status(200).json(employees[employeeIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an employee
export const deleteEmployee = (req: Request, res: Response) => {
  try {
    const empId = req.params.empId;
    const employeeIndex = employees.findIndex(emp => emp.employeeId === empId);

    if (employeeIndex === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Remove employee from the list
    employees.splice(employeeIndex, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
