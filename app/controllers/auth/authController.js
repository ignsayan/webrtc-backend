import responseHandler from '../../utilities/responseHandler.js';
import validateRequest from '../../utilities/validateRequest.js';
import registerRule from '../../validations/auth/registerRule.js';
import registerAction from '../../actions/auth/registerAction.js';
import loginRule from '../../validations/auth/loginRule.js';
import loginAction from '../../actions/auth/loginAction.js';
import googleAuthAction from '../../actions/auth/googleAuthAction.js';
import logoutAction from '../../actions/auth/logoutAction.js';

class AuthController {

    register = responseHandler(async (req) => {
        await validateRequest(registerRule, req);
        const user = await registerAction(req.body);
        return {
            message: 'Registration successful',
            data: { user }
        };
    });

    login = responseHandler(async (req) => {
        await validateRequest(loginRule, req);
        const { user, token } = await loginAction(req.body);
        return {
            message: 'Login successful',
            data: { user, token }
        };
    });

    googleAuth = responseHandler(async (req) => {
        const { user, token } = await googleAuthAction(req.body);
        return {
            message: 'Authentication successful',
            data: { user, token }
        };
    });

    logout = responseHandler(async (req) => {
        await logoutAction(req.headers);
        return { message: 'Logout successful' };
    });
}

export default new AuthController();
