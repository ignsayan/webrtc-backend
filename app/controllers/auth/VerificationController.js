import responseHandler from '../../utilities/responseHandler.js';
import validateRequest from '../../utilities/validateRequest.js';
import sendOtpRule from '../../validations/auth/sendOtpRule.js';
import sendOtpAction from '../../actions/auth/sendOtpAction.js';
import verifyOtpRule from '../../validations/auth/verifyOtpRule.js';
import verifyOtpAction from '../../actions/auth/verifyOtpAction.js';

class VerificationController {
    
    sendOtp = responseHandler(async (req) => {
        await validateRequest(sendOtpRule, req);
        await sendOtpAction(req.body);
        return {
            message: 'Verification code sent successfully'
        };
    });

    verifyOtp = responseHandler(async (req) => {
        await validateRequest(verifyOtpRule, req);
        const user = await verifyOtpAction(req.body);
        return {
            message: 'User verified successfully',
            data: { user }
        };
    });
}

export default new VerificationController();