import { getSocketInstance } from '../../utilities/socketInstance.js';
import Chatroom from '../../models/Chatroom.js';
import Message from '../../models/Message.js';

const action = async ({ body }) => {

    let { sender, receiver, content, chatroom } = body;

    if (!receiver) throw new Error('Receiver id not present');
    if (!sender) throw new Error('Sender id not present');

    const participants = [sender, receiver];

    if (!chatroom) {
        const result = await Chatroom.create({ participants });
        chatroom = result._id.toString();
    }

    const message = await Message.create({
        chatroom,
        sender,
        content,
    });

    const socket = getSocketInstance();
    socket.to(chatroom).emit('message', message);

    return message;
};

export default action;