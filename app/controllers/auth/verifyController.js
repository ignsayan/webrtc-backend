import responseHandler from '../../services/responseHandler.js';
import sendOtpAction from '../../actions/auth/sendOtpAction.js';
import verifyOtpAction from '../../actions/auth/verifyOtpAction.js';


export const sendOtp = responseHandler(async (req) => {
    await sendOtpAction(req.body);
    return {
        message: 'Verification code sent successfully'
    };
});

export const verifyOtp = responseHandler(async (req) => {
    const user = await verifyOtpAction(req.body);
    return {
        message: 'User verified successfully',
        data: { user }
    };
});