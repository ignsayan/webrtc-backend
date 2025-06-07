import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
        expires: 0,
    }
}, {
    collection: 'password_resets',
    timestamps: true,
});

const PasswordReset = mongoose.model('PasswordReset', schema);
export default PasswordReset;