import User from '../../models/User.js';

const action = async ({ query }) => {

    const id = query.exclude;

    const contacts = await User.find({
        _id: {
            $ne: id
        },
    });

    return contacts;
};

export default action;