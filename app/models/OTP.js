import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    channel: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    code: {
        type: Number,
        required: true,
        index: true,
    },
    expiry: {
        type: Date,
        required: true,
        expires: 0,
    },
}, {
    collection: 'otps',
    timestamps: true,
});

const OTP = mongoose.model('OTP', schema);
export default OTP;