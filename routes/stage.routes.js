import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { getQRCode, verifyQRCode } from '../controllers/stage.controller.js';

const router = express.Router();

// Defined under /api/v1/investment ...
router.get('/qrcode/verify', verifyQRCode);
router.get('/qrcode/get', getQRCode);


export default router;
