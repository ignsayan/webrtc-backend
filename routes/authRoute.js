import { router, throttle } from '../app/middlewares/throttledRoutes.js';
import {
    register,
    login,
    logout,
} from '../app/controllers/auth/authController.js';
import {
    forgotPassword,
    resetPassword,
} from '../app/controllers/auth/passwordController.js';
import {
    verifyOtp,
    sendOtp,
} from '../app/controllers/auth/verifyController.js';

// validation rules
import validateRules from '../app/middlewares/validateRules.js';
import registerRule from '../app/validations/auth/registerRule.js';
import loginRule from '../app/validations/auth/loginRule.js';
import forgotPasswordRule from '../app/validations/auth/forgotPasswordRule.js';
import resetPasswordRule from '../app/validations/auth/resetPasswordRule.js';
import sendOtpRule from '../app/validations/auth/sendOtpRule.js';
import verifyOtpRule from '../app/validations/auth/verifyOtpRule.js';
import isAuthenticated from '../app/middlewares/isAuthenticated.js';


const route = router();

// registered routes
route.post('/register',
    throttle(10, 30),
    validateRules(registerRule, register)
);
route.post('/login',
    throttle(5, 60),
    validateRules(loginRule, login)
);
route.post('/forgot-password',
    throttle(5, 30),
    validateRules(forgotPasswordRule, forgotPassword)
);
route.post('/reset-password',
    validateRules(resetPasswordRule, resetPassword)
);
route.post('/send-verification',
    throttle(5, 30),
    validateRules(sendOtpRule, sendOtp)
);
route.post('/verify',
    throttle(5, 30),
    validateRules(verifyOtpRule, verifyOtp)
);
route.post('/logout',
    isAuthenticated,
    logout
);

export default route;