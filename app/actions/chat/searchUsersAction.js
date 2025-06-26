import User from '../../models/User.js';

const searchUsersAction = async ({ query }) => {

    const users = await User.find({
        _id: { $ne: query.sender },
        $or: [
            {
                first_name: {
                    $regex: query.key,
                    $options: 'i',
                }
            },
            {
                last_name: {
                    $regex: query.key,
                    $options: 'i',
                }
            }
        ],
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