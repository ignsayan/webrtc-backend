import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['message', 'group_invite', 'mention'],
        required: true,
    },
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatroom',
        default: null,
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: null,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
    }
}, {
    timestamps: true,
});

const Notification = mongoose.model('Notification', schema);
export default Notification;
