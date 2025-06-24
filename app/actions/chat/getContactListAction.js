import User from '../../models/User.js';
import Role from '../../models/Role.js';
import { ROLE } from '../../../configs/constants.js';

const action = async ({ query }) => {

    const id = query.exclude;

    const role = await Role.findOne({ name: ROLE.ADMIN });
    const contacts = await User.find({
        _id: {
            $ne: id
        },
        roles: {
            $ne: role._id
        }
    });

    return contacts;
};

export default action;