import bcrypt from 'bcrypt';
import PasswordReset from '../../models/PasswordReset.js';
import User from '../../models/User.js';

const action = async (data) => {

    let { token, email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email');

    const passwordReset = await PasswordReset.findOne({ user: user._id });
    if (!passwordReset) throw new Error('Invalid or expired token');

    if (passwordReset.expiry < Date.now()) {
        await passwordReset.deleteOne();
        throw new Error('Token expired');
    }

    const isValidToken = await bcrypt.compare(token, passwordReset.token);
    if (!isValidToken) throw new Error('Invalid token');

    user.password = password;
    await user.save();
    await passwordReset.deleteOne();

    token = user.getAccessToken();

    return { user, token };
};

export default action;