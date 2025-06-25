import { getSocketInstance } from '../../utilities/socketInstance.js';
import Chatroom from '../../models/Chatroom.js';
import Message from '../../models/Message.js';

const action = async ({ body }) => {

    const { chatroom, sender, content } = body;

    if (!chatroom) throw new Error('Chatroom not present');
    if (!sender) throw new Error('Sender not present');

    const message = await Message.create({
        chatroom,
        sender,
        content,
    });

    const io = getSocketInstance();
    io.to(chatroom).emit('listen:message', message);

    return message;
};

export default action;