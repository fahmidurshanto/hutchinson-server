import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { decodeToken } from "../utils/token.js";

export const isAuthenticated = catchAsync(async (req, res, next) => {
    // 1. Get token from cookie or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AppError('You are not logged in', 401);
    }

    // 2. Verify and decode token
    const decoded = decodeToken(token); // this should throw if invalid/expired

    // 3. Attach user to request object
    req.user = decoded;

    // 4. Proceed to next middleware/route handler
    next();
});

export const isAdmin = catchAsync(async (req, res, next) => {
    // 1. Get token from cookie or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AppError('You are not logged in', 401);
    }

    // 2. Verify and decode token
    const decoded = decodeToken(token); // this should throw if invalid/expired
    console.log(decoded.role === "admin")
    // 3. Attach user to request object
    req.user = decoded;

    // 4. Proceed to next middleware/route handler
    next();
});