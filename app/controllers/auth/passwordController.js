import responseHandler from '../../utilities/responseHandler.js';
import validateRequest from '../../utilities/validateRequest.js';
import forgotPasswordRule from '../../validations/auth/forgotPasswordRule.js';
import forgotPasswordAction from '../../actions/auth/forgotPasswordAction.js';
import resetPasswordRule from '../../validations/auth/resetPasswordRule.js';
import resetPasswordAction from '../../actions/auth/resetPasswordAction.js';

class PasswordController {

    forgotPassword = responseHandler(async (req) => {
        await validateRequest(forgotPasswordRule, req);
        await forgotPasswordAction(req.body);
        return {
            message: 'Password reset email sent successfully',
        };
    });

    resetPassword = responseHandler(async (req) => {
        await validateRequest(resetPasswordRule, req);
        const { user, token } = await resetPasswordAction(req.body);
        return {
            message: 'Password reset successfully',
            data: { user, token }
        };
    });
}

export default new PasswordController();