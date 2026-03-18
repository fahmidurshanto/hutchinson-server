import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    time: {
        type: Date,
        required: [true, 'Time is required'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },
}, { timestamps: true });

const Schedule = mongoose.model('schedule', scheduleSchema);
export default Schedule;