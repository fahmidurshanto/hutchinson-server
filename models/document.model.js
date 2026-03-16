import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    path: {
        type: String,
        required: [true, 'Path is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },
    hasUserSeen: {
        type: Boolean,
        default: false
    }


}, { timestamps: true });

const Document = mongoose.model('document', documentSchema);
export default Document;