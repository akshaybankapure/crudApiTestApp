"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const employeesController_1 = require("../controllers/employeesController");
const router = express_1.default.Router();
router.get('/', employeesController_1.getAllEmployees);
router.get('/:empId', employeesController_1.getEmployeeById);
// Validation rules for createEmployee route
const createEmployeeValidationRules = [
    (0, express_validator_1.body)('employeeName').notEmpty().withMessage('employeeName is required.'),
    (0, express_validator_1.body)('age').notEmpty().isInt().withMessage('age must be a valid integer.'),
];
router.post('/', createEmployeeValidationRules, employeesController_1.createEmployee);
router.post('/multiple', createEmployeeValidationRules, employeesController_1.createMultipleEmployees); // Add this line
router.put('/:empId', employeesController_1.updateEmployee);
router.delete('/:empId', employeesController_1.deleteEmployee);
exports.default = router;
