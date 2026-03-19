import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/database.js';
import fs from 'fs';
import path from 'path';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import documentRoutes from './routes/document.route.js';
import profileRoutes from './routes/profile.route.js';
import scheduleRoutes from './routes/schedule.route.js';
import investmentRoutes from './routes/investment.route.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
// app.use('/uploads', express.static('uploads')); // Removed to prevent public access

// create db connection 
connectDB();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
console.log(`🔍 Checking uploads directory at: ${uploadDir}`);
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('📁 Created uploads directory');
} else {
    console.log('✅ Uploads directory already exists');
}

app.get('/api/v1', (req, res) => res.status(200).json({
    success: true,
    message: 'Api is LIVE'
}));

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/document', documentRoutes);
app.use('/api/v1/user', profileRoutes);
app.use('/api/v1/schedule', scheduleRoutes);
app.use('/api/v1/investment', investmentRoutes);


//errorhandler
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});