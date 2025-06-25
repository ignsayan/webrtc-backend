import responseHandler from '../../utilities/responseHandler.js';
import getContactListAction from '../../actions/chat/getContactListAction.js';
import generateRoomAction from '../../actions/chat/generateRoomAction.js';
import getChatroomAction from '../../actions/chat/getInboxDetailAction.js';
import sendMessageAction from '../../actions/chat/sendMessageAction.js';

class ChatController {

    getContactList = responseHandler(async (req) => {
        const contacts = await getContactListAction(req);
        return { data: { contacts } };
    })

    generateRoom = responseHandler(async (req) => {
        const room = await generateRoomAction(req);
        return {
            data: { room }
        };
    })

    getInboxDetail = responseHandler(async (req) => {
        const inbox = await getChatroomAction(req);
        return { data: inbox };
    })

    sendMessage = responseHandler(async (req) => {
        const message = await sendMessageAction(req);
        return {
            message: 'Message sent successfully',
            data: { message }
        };
    })
}

export default new ChatController();