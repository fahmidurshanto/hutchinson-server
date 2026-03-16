import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Document from '../models/document.model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Create unique filename: originalName-timestamp.extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${uniqueSuffix}${ext}`);
    }
});

export const upload = multer({ storage: storage });

// Upload document controller
export const uploadDocument = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'Please upload a file'
        });
    }

    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'User ID is required'
        });
    }

    const document = await Document.create({
        name: req.file.filename,
        path: req.file.path,
        user: userId
    });

    res.status(201).json({
        success: true,
        message: 'Document uploaded successfully',
        document
    });
});

// Delete document controller (Admin only)
export const deleteDocument = catchAsync(async (req, res, next) => {
    const document = await Document.findById(req.params.id);

    if (!document) {
        return next(new AppError('Document not found', 404));
    }

    // Delete file from disk
    if (fs.existsSync(document.path)) {
        fs.unlinkSync(document.path);
    }

    await document.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Document deleted successfully'
    });
});
