"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import router from
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/employees', employeeRoutes_1.default);
// Handle non-existing endpoints
app.use((_req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});
// Handle errors
app.use((error, _req, res, _next) => {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal server error' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
