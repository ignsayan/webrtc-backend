import responseHandler from '../../utilities/responseHandler.js';
import getRecentChatsAction from '../../actions/chat/getRecentChatsAction.js';
import searchUsersAction from '../../actions/chat/searchUsersAction.js';
import generateRoomAction from '../../actions/chat/generateRoomAction.js';
import getChatroomAction from '../../actions/chat/getInboxDetailAction.js';
import sendMessageAction from '../../actions/chat/sendMessageAction.js';

class ChatController {

    getRecentChats = responseHandler(async (req) => {
        const recents = await getRecentChatsAction(req);
        return { data: { recents } };
    });

    searchUsers = responseHandler(async (req) => {
        const users = await searchUsersAction(req);
        return { data: { users } };
    });

    generateRoom = responseHandler(async (req) => {
        const room = await generateRoomAction(req);
        return { data: { room } };
    });

    getInboxDetail = responseHandler(async (req) => {
        const inbox = await getChatroomAction(req);
        return { data: inbox };
    });

    sendMessage = responseHandler(async (req) => {
        const message = await sendMessageAction(req);
        return {
            message: 'Message sent successfully',
            data: { message }
        };
    });
}

export default new ChatController();