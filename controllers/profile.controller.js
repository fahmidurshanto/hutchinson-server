import Investment from "../models/investment.model.js";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// Get memberships for a user
export const getMemberships = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findById(userId).select('memberships');

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        success: true,
        data: user.memberships
    });
});

// Get services for a user
export const getUserServices = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findById(userId).select('services');

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        success: true,
        data: user.services
    });
});

// Update membership status for a user
export const updateMembershipStatus = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const { tierName, status } = req.body;

    if (!tierName || !status) {
        return next(new AppError('Please provide tierName and status', 400));
    }

    const user = await User.findOneAndUpdate(
        { _id: userId, 'memberships.name': tierName },
        { $set: { 'memberships.$.status': status.toLowerCase() } },
        { new: true, runValidators: true }
    );

    if (!user) {
        return next(new AppError('User or tier not found', 404));
    }

    res.status(200).json({
        success: true,
        data: user.memberships
    });
});

// Update service status for a user
export const updateUserServiceStatus = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const { serviceName, status } = req.body;

    if (!serviceName || !status) {
        return next(new AppError('Please provide serviceName and status', 400));
    }

    const user = await User.findOneAndUpdate(
        { _id: userId, 'services.name': serviceName },
        { $set: { 'services.$.status': status } },
        { new: true, runValidators: true }
    );

    if (!user) {
        return next(new AppError('User or service not found', 404));
    }

    res.status(200).json({
        success: true,
        data: user.services
    });
});

// Get Financial Summary for a user
export const getFinancialSummary = catchAsync(async (req, res) => {
    const { userId } = req.params;

    const investments = await Investment.find({ user: userId });
    
    const summary = investments.map(inv => ({
        label: inv.name.toUpperCase(),
        value: `USD ${inv.amount.toLocaleString()}`
    }));

    const totalAmount = investments.reduce((sum, inv) => sum + inv.amount, 0);

    res.status(200).json({
        success: true,
        data: summary,
        totalDisbursement: `USD ${totalAmount.toLocaleString()}`
    });
});

// Get Entities for a user
export const getEntities = catchAsync(async (req, res) => {
    const { userId } = req.params;
    
    const investments = await Investment.find({ user: userId });
    
    // In a real app, entities might be a separate model. 
    // For now, we'll derive them from investment names as a fallback.
    const primary = investments.map(inv => ({
        name: inv.name.toUpperCase(),
        status: inv.isValid ? 'Active' : 'Inactive'
    }));

    // Mocking 3rd party for now as there's no model for it
    const thirdParty = [
        { name: 'ASIAN TRAVEL CLUB', status: 'Active' },
        { name: 'CONCORD DEVELOPMENT PTE LTD', status: 'Active' },
    ];

    res.status(200).json({
        success: true,
        primary,
        thirdParty
    });
});

// Get Service Status for a user
export const getServiceStatus = catchAsync(async (req, res) => {
    // This would typically come from a 'Services' model. 
    // Returning structured data from backend to replace frontend hardcoding.
    const services = [
        { label: 'Cessation', value: 'COMPLETED (2018)' },
        { label: 'Stamp Fee', value: 'COMPLETED (2018)' },
        { label: 'Anti Money Laundering ( AML )', value: 'COMPLETED (2018)' },
        { label: 'Capital Gain Tax', value: 'COMPLETED (2018)' },
        { label: 'Arbitration', value: 'COMPLETED (2018)' },
        { label: 'Security Deposit', value: 'COMPLETED (2018)' },
        { label: 'Offshore Fees', value: 'COMPLETED (2018)' },
        { label: 'Release Form', value: 'COMPLETED (2018)' },
        { label: 'Conveyance fee', value: 'COMPLETED (2018)' },
        { label: 'Auditing Report', value: 'COMPLETED (2018)' },
    ];

    res.status(200).json({
        success: true,
        data: services
    });
});

// Get Investment Reports grouped by year and month for a user
export const getInvestmentReports = catchAsync(async (req, res) => {
    const { userId } = req.params;

    const investments = await Investment.find({ user: userId }).sort({ year: 1, createdAt: 1 });

    const groupedData = investments.reduce((acc, inv) => {
        const year = inv.year.toString();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push({
            month: inv.month,
            amount: inv.amount
        });
        return acc;
    }, {});

    res.status(200).json({
        success: true,
        data: groupedData
    });
});

// Admin: Create or update an investment report for a specific user, year, and month
export const createOrUpdateInvestmentReport = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const { year, month, amount } = req.body;

    if (!year || !month || amount === undefined) {
        return next(new AppError('Please provide year, month, and amount.', 400));
    }

    // Try to find if an investment for this user/year/month already exists
    let investment = await Investment.findOne({ user: userId, year, month });

    if (investment) {
        // Update existing
        investment.amount = Number(amount);
        await investment.save();
    } else {
        // Create new
        investment = await Investment.create({
            name: 'Monthly Investment',
            year,
            month,
            amount: Number(amount),
            isValid: true,
            user: userId
        });
    }

    res.status(200).json({
        success: true,
        message: 'Investment report updated successfully',
        data: investment
    });
});

