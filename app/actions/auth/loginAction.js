import User from '../../models/User.js';
import bcrypt from 'bcrypt';

const action = async ({
    email,
    username,
    password,
}) => {

    const user = await User.findOne({
        $or: [
            email ? { email } : null,
            username ? { username } : null
        ].filter(Boolean)
    });

    if (!user || user.password === null) {
        throw new Error('Invalid credentials');
    }

    const isValidPassword = user ? await bcrypt.compare(password, user.password) : false;
    if (!user || !isValidPassword) {
        const error = new Error('Invalid credentials');
        error.status = 422;
        throw error;
    }

    const token = user.getAccessToken();

    return { user, token };
};

export default action;