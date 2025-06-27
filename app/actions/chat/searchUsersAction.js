import User from '../../models/User.js';

const searchUsersAction = async ({ query }) => {

    const parts = query.key.trim().split(/\s+/);

    const users = await User.find({
        _id: {
            $ne: query.sender
        },
        $and: parts.map(part => ({
            $or: [
                {
                    first_name: {
                        $regex: part,
                        $options: 'i'
                    }
                },
                {
                    last_name: {
                        $regex: part,
                        $options: 'i'
                    }
                }
            ]
        }))
    })
        .select({
            first_name: 1,
            last_name: 1,
            avatar: 1,
            permissions: 0,
            roles: 0,
        });

    return users;
};

export default searchUsersAction;