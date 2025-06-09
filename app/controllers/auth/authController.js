import responseHandler from '../../services/responseHandler.js';
import registerAction from '../../actions/auth/registerAction.js';
import loginAction from '../../actions/auth/loginAction.js';
import googleAuthAction from '../../actions/auth/googleAuthAction.js';
import logoutAction from '../../actions/auth/logoutAction.js';
import { getIoInstance } from '../../../configs/socketio.js';


export const register = responseHandler(async (req) => {
    const user = await registerAction(req.body);
    return {
        message: 'Registration successful',
        data: { user }
    };
});

export const login = responseHandler(async (req) => {
    const { user, token } = await loginAction(req.body);
    return {
        message: 'Login successful',
        data: { user, token }
    };
});

export const googleAuth = responseHandler(async (req) => {
    const { user, token } = await googleAuthAction(req.body);
    return {
        message: 'Authentication successful',
        data: { user, token }
    };
});

export const logout = responseHandler(async (req) => {
    await logoutAction(req.headers);
    return { message: 'Logout successful' };
});