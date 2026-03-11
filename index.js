import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import { getUsers, login, logout, register } from './controllers/user.controller.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// create db connection 
connectDB();

// Routes
app.post('/api/v1/auth/register', register);
app.post('/api/v1/auth/login', login);
app.post('/api/v1/auth/logout', logout);
app.get('/api/v1/users', getUsers);


// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});