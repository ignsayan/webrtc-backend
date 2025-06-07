import User from '../models/User.js';

const hasVerified = (channel = null) => {

    return async (req, res, next) => {

        const user = await User.findById(req.user.id);

        if (channel === 'phone' && !user.hasVerifiedPhone()) {
            return res.status(403).json({
                errors: 'You do not have verified phone number'
            });
        };

        if (channel === 'email' && !user.hasVerifiedEmail()) {
            return res.status(403).json({
                errors: 'You do not have verified email'
            });
        };

        if (!channel) {
            if (!(user.hasVerifiedEmail() && user.hasVerifiedPhone())) {
                return res.status(403).json({
                    errors: 'Please complete the verification process'
                });
            };
        }

        return next();
    };
};

export default hasVerified;