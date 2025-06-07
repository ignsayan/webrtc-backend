import User from '../../models/User.js';
import OTP from '../../models/OTP.js';

const action = async (data) => {

    const { code, channel } = data;

    const otp = await OTP.findOne({ code, channel });
    if (!otp) throw new Error('Invalid or expired OTP');

    const user = await User.findOne({ _id: otp.user });
    if (!user) throw new Error('No user found');

    if (channel === 'email') await user.markEmailAsVerified();
    if (channel === 'phone') await user.markPhoneAsVerified();

    await otp.deleteOne();
    return user;
};

export default action;