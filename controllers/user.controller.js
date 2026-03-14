import User from '../models/user.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { clearCookie, setAuthCookies } from '../utils/response.js';
import { decodeToken, generateAccessToken, generateRefreshToken } from '../utils/token.js';


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

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);
    setAuthCookies(res, accessToken, refreshToken, 'User logged in successfully', 200);
});


export const logout = catchAsync(async (req, res) => {
    // Check for token in cookies (or Authorization header if you prefer)
    const accessToken = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        throw new AppError('You are not logged in', 401);
    }

    clearCookie(res, 'User logged out successfully', 200);
});

// get all users
export const aboutMe = catchAsync(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new AppError("user not found", 400)
    }
    return res.status(200).json({
        success: true,
        user
    });

});


// change pass of admin
export const changeAdminPassword = catchAsync(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword ) {
        throw new AppError('Old Password and NewPassword are required to validate', 404);
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
        throw new AppError('Old password is incorrect', 401);
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    });
});


// change pass of user
export const changeUserPasswordByAdmin = catchAsync(async (req, res) => {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    });
});
