import Chatroom from '../../models/Chatroom.js';
import Message from '../../models/Message.js';
import mongoose from 'mongoose';

const action = async ({ query }) => {

    const sender = query.sender;

    const rooms = await Chatroom.find({
        participants: { $in: [sender] }
    })
        .populate({
            path: 'participants',
            match: { _id: { $ne: sender } },
            select: {
                first_name: 1,
                last_name: 1,
                avatar: 1,
                permissions: 0,
                roles: 0,
            }
        });

    const roomIds = rooms.map((room) => {
        return new mongoose.Types.ObjectId(room._id);
    });

    const conversations = await Message.aggregate([
        { $match: { chatroom: { $in: roomIds } } },
        { $sort: { createdAt: -1 } },
        {
            $group: {
                _id: '$chatroom',
                message: { $first: '$$ROOT' }
            }
        }
    ]);

    return rooms.map(room => {
        const conversation = conversations.find((conversation) => {
            const messageRoomId = conversation.message.chatroom.toString();
            const chatRoomId = room._id.toString();
            return messageRoomId === chatRoomId;
        });
        return {
            ...room.toObject(),
            message: conversation?.message || null,
        }
    });
};

export default action;