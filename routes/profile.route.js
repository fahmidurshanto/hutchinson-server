import express from 'express';
import { 
    getFinancialSummary, 
    getInvestmentReports, 
    createOrUpdateInvestmentReport, 
    getEntities, 
    getServiceStatus 
} from '../controllers/profile.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Defined under /api/v1/user ...
router.get('/financial-summary/:userId', isAuthenticated, getFinancialSummary);
router.get('/investment-reports/:userId', isAuthenticated, getInvestmentReports);
router.post('/investment-reports/:userId', isAuthenticated, isAdmin, createOrUpdateInvestmentReport);
router.get('/entities/:userId', isAuthenticated, getEntities);
router.get('/services/:userId', isAuthenticated, getServiceStatus);

export default router;
