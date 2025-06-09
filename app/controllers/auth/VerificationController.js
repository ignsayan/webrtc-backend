import responseHandler from '../../utilities/responseHandler.js';
import sendOtpAction from '../../actions/auth/sendOtpAction.js';
import verifyOtpAction from '../../actions/auth/verifyOtpAction.js';

class VerificationController {
    
    sendOtp = responseHandler(async (req) => {
        await sendOtpAction(req.body);
        return {
            message: 'Verification code sent successfully'
        };
    });

    verifyOtp = responseHandler(async (req) => {
        const user = await verifyOtpAction(req.body);
        return {
            message: 'User verified successfully',
            data: { user }
        };
    });
}

export default new VerificationController();