import { router, throttle } from '../app/middlewares/throttledRoutes.js';
import ChatController from '../app/controllers/chat/ChatController.js';


const route = router();

// registered routes
route.get('/contacts',
    ChatController.getContactList
);
route.get('/room',
    ChatController.getChatroom
);
route.post('/send-message',
    ChatController.sendMessage
);

export default route;