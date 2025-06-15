import { OTP } from '../../configs/constants.js';
import User from '../models/User.js';

const hasVerified = (channel = null) => {

    return async (req, res, next) => {

        const user = await User.findById(req.user.id);

        if (channel === OTP.CHANNEL.PHONE && !user.hasVerifiedPhone()) {
            return res.status(403).json({
                error: 'You do not have verified phone number'
            });
        };

        if (channel === OTP.CHANNEL.EMAIL && !user.hasVerifiedEmail()) {
            return res.status(403).json({
                error: 'You do not have verified email'
            });
        };

        if (!channel) {
            if (!(user.hasVerifiedEmail() && user.hasVerifiedPhone())) {
                return res.status(403).json({
                    error: 'Please complete the verification process'
                });
            };
        }

        return next();
    };
};

export default hasVerified;