import responseHandler from '../../utilities/responseHandler.js';
import getContactListAction from '../../actions/chat/getContactListAction.js';
import getChatroomAction from '../../actions/chat/getChatroomAction.js';
import sendMessageAction from '../../actions/chat/sendMessageAction.js';

class ChatController {

    getContactList = responseHandler(async (req) => {
        const contacts = await getContactListAction(req);
        return {
            data: { contacts }
        };
    })

    getChatroom = responseHandler(async (req) => {
        const { receiver, messages, chatroom } = await getChatroomAction(req);
        return {
            data: { receiver, messages, chatroom }
        };
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