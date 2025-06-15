import User from '../../models/User.js';
import { PROVIDER, ROLE } from '../../../configs/constants.js';
import Role from '../../models/Role.js';

const action = async ({
    first_name,
    last_name,
    email,
    phone,
    password = null,
}) => {

    let user = await User.findOne({ email });
    if (!user) {
        const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
        user = await User.create({
            first_name,
            last_name,
            username,
            email,
            phone,
            password,
            auth_provider: PROVIDER.GOOGLE,
        });
        const role = await Role.findOne({ name: ROLE.USER });
        user.roles.push(role._id);
        await user.save();
    }

    if (!user.hasVerifiedEmail()) {
        user.markEmailAsVerified();
    }

    const token = user.getAccessToken();
    return { user, token };
};

export default action;