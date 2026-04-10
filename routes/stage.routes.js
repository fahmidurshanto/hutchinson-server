import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware.js';
import { addStage, getAllStage, getQRCode, verifyQRCode, getUserStage, addUserStage, removeUserStage, editUserStage, deleteStage, editStage } from '../controllers/stage.controller.js';

const router = express.Router();

// Defined under /api/v1/investment ...
router.get('/verify',isAuthenticated, verifyQRCode);
// router.get('/qrcode/get', getQRCode);

 // stage routes for admin
router.post('/add', addStage);
router.post('/delete', deleteStage);
router.post('/edit', editStage);
router.get('/getall', getAllStage);

// User-specific stage routes (maps to /api/v1/stage/user/:userId)
router.get('/user/:userId', getUserStage);
router.post('/user/:userId', addUserStage);
router.delete('/user/:userId', removeUserStage);
router.put('/user/:userId', editUserStage);


export default router;
