import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
// import router from
import employeesRoutes from './routes/employeeRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/api/employees', employeesRoutes);

// Handle non-existing endpoints
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Handle errors
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
