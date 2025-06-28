import Chatroom from '../../models/Chatroom.js';
import Message from '../../models/Message.js';

const action = async ({ query }) => {

    const { chatroom, sender } = query;

    if (!chatroom) throw new Error('Chatroom is not present');
    if (!sender) throw new Error('Sender id not present');

    const room = await Chatroom.findById(chatroom).populate({
        path: 'participants',
        select: {
            first_name: 1,
            last_name: 1,
            avatar: 1,
            permissions: 0,
            roles: 0,
        }
    });

    if (!room) throw new Error('Chatroom not found');

    const messages = await Message.find({
        chatroom: room._id,
    });

    let receiver = null;

    receiver = room.participants.find(
        (participant) => participant._id.toString() !== sender
    );

    return { receiver, messages };
};

export default action;