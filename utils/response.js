export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const setCookie = (res, token, message = 'Success', statusCode = 200) => {
    // Set cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days, can be configurable
    };
    res.cookie('token', token, cookieOptions);
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