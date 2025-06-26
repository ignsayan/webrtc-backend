import User from '../../models/User.js';
import Role from '../../models/Role.js';
import { ROLE } from '../../../configs/constants.js';
import Message from '../../models/Message.js';

const action = async ({ query }) => {

    const sender = query.sender;

    const role = await Role.findOne({ name: ROLE.ADMIN });
    const contacts = await User.find({
        _id: {
            $ne: sender
        },
        roles: {
            $ne: role._id
        }
    });
    
    return contacts;
};

export default action;