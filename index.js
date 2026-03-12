import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import { aboutMe, login, logout, registerUser } from './controllers/user.controller.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// create db connection 
connectDB();

// Routes
app.post('/api/v1/auth/user/register', registerUser);
app.post('/api/v1/auth/login', login);
app.get('/api/v1/auth/logout', logout);
app.get('/api/v1/auth/me', aboutMe);


//errorhandler
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});