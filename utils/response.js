// export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
//     return res.status(statusCode).json({
//         success: true,
//         message,
//         data
//     });
// };

export const setAuthCookies = (res, accessToken, refreshToken, message = 'Success', statusCode = 200) => {
    const accessMaxAge = Number(process.env.ACCESS_COOKIES_VALIDITY);
    const refreshMaxAge = Number(process.env.REFRESH_COOKIES_VALIDITY);

    if (isNaN(accessMaxAge) || isNaN(refreshMaxAge)) {
        throw new Error('Cookie validity environment variables must be numbers');
    }

    const baseOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // or 'strict' depending on your needs
    };

    res.cookie('accessToken', accessToken, {
        ...baseOptions,
        maxAge: accessMaxAge * 60 * 1000, // minutes
        // path: '/', // default
    });

    res.cookie('refreshToken', refreshToken, {
        ...baseOptions,
        maxAge: refreshMaxAge * 24 * 60 * 60 * 1000, // days
        path: '/refresh', // optional: restrict to refresh endpoint
    });

    return res.status(statusCode).json({
        success: true,
        message,
    });
};

export const clearCookie = (res, message = 'Logged out successfully', statusCode = 200) => {
    // Clear cookie by setting it with an expired date
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0) // Set expiration to the past
    });

    return res.status(statusCode).json({
        success: true,
        message
    });
};