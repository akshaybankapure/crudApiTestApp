import express from 'express';
import { body } from 'express-validator';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createMultipleEmployees
} from '../controllers/employeesController';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:empId', getEmployeeById);

// Validation rules for createEmployee route
const createEmployeeValidationRules = [
  body('employeeName').notEmpty().withMessage('employeeName is required.'),
  body('age').notEmpty().isInt().withMessage('age must be a valid integer.'),
];

router.post('/', createEmployeeValidationRules, createEmployee);
router.post('/multiple', createEmployeeValidationRules, createMultipleEmployees); // Add this line
router.put('/:empId', updateEmployee);
router.delete('/:empId', deleteEmployee);

export default router;
