import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Investment name is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        trim: true
    },
    amount: {
        type: Number,
        default: 0
    },

    isValid: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },


}, { timestamps: true });

const Investment = mongoose.model('investment', investmentSchema);
export default Investment;