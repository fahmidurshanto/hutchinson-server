import express from 'express';
import {
    getFinancialSummary,
    getInvestmentReports,
    createOrUpdateInvestmentReport,
    getServiceStatus,
    getEntities,
    getMemberships,
    updateMembershipStatus,
    getUserServices,
    updateUserServiceStatus
} from '../controllers/profile.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Defined under /api/v1/user ...
router.get('/financial-summary/:userId', isAuthenticated, getFinancialSummary);
router.get('/investment-reports/:userId', isAuthenticated, getInvestmentReports);
router.post('/investment-reports/:userId', isAuthenticated, isAdmin, createOrUpdateInvestmentReport);
router.get('/entities/:userId', isAuthenticated, getEntities);
router.get('/services/:userId', isAuthenticated, getServiceStatus);
router.get('/user-services/:userId', isAuthenticated, getUserServices);
router.patch('/user-services/:userId', isAuthenticated, isAdmin, updateUserServiceStatus);
router.get('/memberships/:userId', isAuthenticated, getMemberships);
router.patch('/memberships/:userId', isAuthenticated, isAdmin, updateMembershipStatus);

export default router;
