import User from '../../models/User.js';
import bcrypt from 'bcrypt';

const action = async (data) => {

    const { email, username, password } = data;

    const user = await User.findOne({
        $or: [
            email ? { email } : null,
            username ? { username } : null
        ].filter(Boolean)
    });

    const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isPasswordValid) {
        const error = new Error('Invalid credentials');
        error.status = 422;
        throw error;
    }

    const token = user.getAccessToken();

    return { user, token };
};

export default action;