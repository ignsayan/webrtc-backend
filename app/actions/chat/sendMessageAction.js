import Chatroom from '../../models/Chatroom.js';
import Message from '../../models/Message.js';

const action = async ({ body }) => {

    let { sender, receiver, content, chatroom } = body;

    if (!receiver) throw new Error('Receiver id not present');
    if (!sender) throw new Error('Sender id not present');

    const participants = [sender, receiver];

    if (!chatroom) {
        const result = await Chatroom.create({ participants });
        chatroom = result._id;
    }

    await Message.create({
        chatroom,
        sender,
        content,
    });
};

export default action;