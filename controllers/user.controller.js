import User from '../models/user.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { clearCookie, setCookie } from '../utils/response.js';
import { decodeToken, generateToken } from '../utils/token.js';


export const registerUser = catchAsync(async (req, res) => {
    const { firstName, lastName, Phone, gender, email, nric, address, nationality, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError('User already exists', 400);
    }

    // Create new user (role defaults to 'user' from schema)
    await User.create({ firstName, lastName, Phone, gender, email, nric, address, nationality, password });

    res.status(201).json({
        success: true,
        message: 'User registered successfully'
    });
});

// login user and get token
export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('Invalid email or password', 400);
    }

    const isMatch = await user.comparePassword(password.toString());
    if (!isMatch) {
        // Use consistent error handling – throw instead of returning a response
        throw new AppError('Invalid email or password', 401);
    }

    const token = generateToken(user);  // pass the user object
    setCookie(res, token, 'User logged in successfully', 200);
});


export const logout = catchAsync(async (req, res) => {
    // Check for token in cookies (or Authorization header if you prefer)
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AppError('You are not logged in', 401);
    }

    clearCookie(res, 'User logged out successfully', 200);
});

// get all users
export const aboutMe = catchAsync(async (req, res) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AppError('You are not logged in', 401);
    }
    const user = decodeToken(token);
    return res.status(200).json({
        success: true,
        user
    });


});