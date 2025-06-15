import User from '../../models/User.js';
import OTP from '../../models/OTP.js';
import { OTP as OTP_CONST } from '../../../configs/constants.js';

const action = async (data) => {

    const { code, channel } = data;

    const otp = await OTP.findOne({ code, channel });
    if (!otp) throw new Error('Invalid or expired OTP');

    const user = await User.findOne({ _id: otp.user });
    if (!user) throw new Error('No user found');

    if (channel === OTP_CONST.CHANNEL.EMAIL) await user.markEmailAsVerified();
    if (channel === OTP_CONST.CHANNEL.PHONE) await user.markPhoneAsVerified();

    await otp.deleteOne();
    return user;
};

export default action;