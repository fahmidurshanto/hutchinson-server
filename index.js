import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import { aboutMe, changeAdminPassword, changeUserPasswordByAdmin, login, logout, registerUser } from './controllers/user.controller.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { createInvestment, getInvestment, getInvestmentById, setInvestmentValidity } from './controllers/investment.controller.js';
import { isAuthenticated, isAdmin, setAccessCookie } from './middleware/auth.middleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// create db connection 
connectDB();

app.get('/api/v1', (req, res) => res.status(200).json({
    success: true,
    message: 'Api is LIVE'
}));

// Routes for User
app.post('/api/v1/auth/user/register', isAuthenticated, isAdmin, registerUser);
app.post('/api/v1/auth/user/changepassword', isAuthenticated, isAdmin, changeUserPasswordByAdmin);
app.post('/api/v1/auth/admin/changepassword', isAuthenticated, isAdmin, changeAdminPassword);
app.post('/api/v1/auth/login', login);
app.get('/api/v1/auth/logout', isAuthenticated, logout);
app.get('/api/v1/auth/me', isAuthenticated, aboutMe);

// Route for Investment
app.post('/api/v1/investment/create', isAuthenticated, createInvestment);
app.post('/api/v1/investment/validity', isAuthenticated, setInvestmentValidity);
app.get('/api/v1/investment/get', isAuthenticated, getInvestment);   // search by userId(body) with year(query)
app.get('/api/v1/investment/get/:investmentId', isAuthenticated, getInvestmentById);  // search by investmentId [ex: investmentId=69b47a926476d4c1c33c483a]



//errorhandler
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});