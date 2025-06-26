import { router, throttle } from '../app/middlewares/throttledRoutes.js';
import ChatController from '../app/controllers/chat/ChatController.js';


const route = router();

// registered routes
route.get('/recent',
    ChatController.getRecentChats
);
route.get('/search-users',
    ChatController.searchUsers,
);
route.post('/room',
    ChatController.generateRoom
);
route.get('/inbox',
    ChatController.getInboxDetail
);
route.post('/send-message',
    ChatController.sendMessage
);

export default route;