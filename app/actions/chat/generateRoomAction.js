import Chatroom from '../../models/Chatroom.js';

const action = async ({ body }) => {

    const { sender, receiver } = body;

    let chatroom = await Chatroom.findOne({
        participants: {
            $all: [receiver, sender]
        }
    });

    if (!chatroom) {
        chatroom = await Chatroom.create({
            participants: [receiver, sender]
        });
    }

    const room = chatroom._id.toString();

    return room;
};

export default action;