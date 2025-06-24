import Chatroom from '../../models/Chatroom.js';
import Message from '../../models/Message.js';
import User from '../../models/User.js';

const action = async ({ query }) => {

    let { sender, receiver } = query;

    if (!receiver) throw new Error('Receiver id not present');
    if (!sender) throw new Error('Sender id not present');

    let messages = [];

    const chatroom = await Chatroom.findOne({
        isGroup: false,
        participants: {
            $all: [sender, receiver]
        }
    });

    if (chatroom) {
        messages = await Message.find({
            chatroom: chatroom._id
        });
    }

    receiver = await User.findById(receiver);

    return {
        chatroom: chatroom ? chatroom._id : null,
        receiver,
        messages,
    };
};

export default action;