
interface Employee {
  employeeId: string;           // Generated unique identifier
  employeeName: string;         // Required
  salaryAmount?: number;        // Optional
  age: number;                  // Required
  email?: string;               // Optional
  degreeDetails?: string[];     // Array of strings (e.g., ['MS', 'BTech']) etc
}

export default Employee;
