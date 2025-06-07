import User from '../app/models/User.js'
import Role from '../app/models/Role.js'
import Permission from '../app/models/Permission.js'
import { ROLE } from '../configs/constants.js'

export default async function adminSeeder() {

    let user = await User.findOne({ email: 'sayan@yopmail.com' });

    if (!user) {
        user = await User.create({
            first_name: 'Chini',
            last_name: 'Dey',
            username: 'beingchinidey',
            email: 'ayandey166@gmail.com',
            phone: '9876543210',
            email_verified_at: new Date(),
            phone_verified_at: new Date(),
            password: 'chini@sussi',
        });
    }

    const role = await Role.findOne({ name: ROLE.ADMIN });
    const permissions = await Permission.find({});

    user.roles = [role._id];
    user.permissions = permissions.map(permission => permission._id);

    await user.save();
};