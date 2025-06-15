import { OTP } from '../../../configs/constants.js';
import User from '../../models/User.js';

const action = async (data) => {

    const { attribute, channel } = data;

    const user = await User.findOne({ [channel]: attribute });

    if (!user) {
        throw new Error('No user found with this record');
    }

    if (channel === OTP.CHANNEL.EMAIL) {
        if (user.hasVerifiedEmail()) throw new Error('Email already verified');
        await user.sendEmailVerification();
    }

    if (channel === OTP.CHANNEL.PHONE) {
        if (user.hasVerifiedPhone()) throw new Error('Phone already verified');
        await user.sendPhoneVerification();
    }
};

export default action;