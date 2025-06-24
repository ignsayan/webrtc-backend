import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatroom',
        required: true,
        index: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    content: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        enum: ['text', 'image', 'video', 'audio', 'file'],
        default: 'text',
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        default: null,
    },
    seenBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {
    timestamps: true,
});

schema.index({ chatroom: 1, createdAt: -1 });

const Message = mongoose.model('Message', schema);
export default Message;