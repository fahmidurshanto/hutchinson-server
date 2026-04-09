import QRCode from 'qrcode';
import catchAsync from '../utils/catchAsync.js';

const qrCodeData = "1234567890"

export const getQRCode = catchAsync(async (req, res, next) => {
    // The URL that will be encoded in the QR code
    const qrCodeUrl = `http://localhost:4000/api/v1/stage/qrcode/verify?id=${qrCodeData}`;

    // Generate QR code with higher resolution (600px) to prevent blurriness
    const qrCodeImage = await QRCode.toDataURL(qrCodeUrl, { 
        width: 600,
        margin: 2
    });

    return res.status(200).json({
        success: true,
        message: 'qrcode get successfully',
        qrCodeImage,
        qrCodeUrl
    })
});

export const verifyQRCode = catchAsync(async (req, res, next) => {
    const { id } = req.query;

    if (id === qrCodeData) {
        return res.status(200).json({
            success: true,
            message: 'qrcode verified successfully',
            data: { id }
        })
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid qrcode'
        })
    }
});