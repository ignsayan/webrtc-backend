import OTP from '../models/OTP.js';

export const createAndStoreOtp = async (user, channel) => {

    return await OTP.findOneAndUpdate(
        { user: user._id, channel },
        {
            code: Math.floor(100000 + Math.random() * 900000),
            expiry: new Date(Date.now() + 10 * 60 * 1000),
        },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
    );
};

export default createAndStoreOtp;