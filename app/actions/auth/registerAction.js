import User from '../../models/User.js';
import Role from '../../models/Role.js';
import { ROLE } from '../../../configs/constants.js';
import jwt from 'jsonwebtoken';

const action = async (data) => {

    const { first_name, last_name, email, phone, password } = data;

    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

    const user = await User.create({
        first_name,
        last_name,
        username,
        email,
        phone,
        password,
    });

    if (user) {

        const role = await Role.findOne({ name: ROLE.USER });
        user.roles.push(role._id);
        await user.save();

        await user.sendEmailVerification();
        const token = user.getAccessToken();

        return { user, token };
    }
};

export default action;
