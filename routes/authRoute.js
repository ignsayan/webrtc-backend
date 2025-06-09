import { router, throttle } from '../app/middlewares/throttledRoutes.js';
import AuthController from '../app/controllers/auth/AuthController.js';
import PasswordController from '../app/controllers/auth/PasswordController.js';
import VerificationController from '../app/controllers/auth/VerificationController.js';
import isAuthenticated from '../app/middlewares/isAuthenticated.js';


const route = router();

// registered routes
route.post('/register',
    throttle(10, 30),
    AuthController.register
);
route.post('/login',
    throttle(5, 60),
    AuthController.login
);
route.post('/google',
    throttle(5, 60),
    AuthController.googleAuth
);
route.post('/logout',
    isAuthenticated,
    AuthController.logout
);
route.post('/forgot-password',
    throttle(5, 30),
    PasswordController.forgotPassword
);
route.post('/reset-password',
    throttle(5, 30),
    PasswordController.resetPassword
);
route.post('/send-verification',
    throttle(5, 30),
    VerificationController.sendOtp
);
route.post('/verify',
    throttle(5, 30),
    VerificationController.verifyOtp
);

export default route;