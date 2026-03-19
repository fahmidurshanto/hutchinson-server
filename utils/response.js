// export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
//     return res.status(statusCode).json({
//         success: true,
//         message,
//         data
//     });
// };

export const setAuthCookies = (req, res, accessToken, refreshToken, message = 'Success', statusCode = 200) => {
    const accessMaxAge = Number(process.env.ACCESS_COOKIES_VALIDITY);
    const refreshMaxAge = Number(process.env.REFRESH_COOKIES_VALIDITY);

    if (isNaN(accessMaxAge) || isNaN(refreshMaxAge)) {
        throw new Error('Cookie validity environment variables must be numbers');
    }

    // const baseOptions = {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'lax', // or 'strict' depending on your needs
    // };

    const baseOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    };

    res.cookie('accessToken', accessToken, {
        ...baseOptions,
        maxAge: accessMaxAge * 60 * 1000, // minutes
        // path: '/', // default
    });

    res.cookie('refreshToken', refreshToken, {
        ...baseOptions,
        maxAge: refreshMaxAge * 24 * 60 * 60 * 1000,
    });

    return res.status(statusCode).json({
        success: true,
        message,
    });
};


export const setAccessCookies = (res, accessToken, next) => {
    const accessMaxAge = Number(process.env.ACCESS_COOKIES_VALIDITY);
    if (isNaN(accessMaxAge)) {
        throw new Error('ACCESS_COOKIES_VALIDITY must be a number');
    }

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: accessMaxAge * 60 * 1000, // convert minutes to milliseconds
    });
    next();
};

export const clearCookie = (res, message = 'Logged out successfully', statusCode = 200) => {
    // Clear cookie by setting it with an expired date
    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0) // Set expiration to the past
    });
    res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0) // Set expiration to the past
    });

    return res.status(statusCode).json({
        success: true,
        message
    });
};