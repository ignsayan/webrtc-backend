import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    isGroup: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: null,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    last_message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
}, {
    timestamps: true,
});

const Chatroom = mongoose.model('Chatroom', schema);
export default Chatroom;