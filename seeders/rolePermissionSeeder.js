import { ROLE } from '../configs/constants.js'
import Role from '../app/models/Role.js'
import { PERMISSION } from '../configs/constants.js'
import Permission from '../app/models/Permission.js'

export default async function rolePermissionSeeder() {

    const rolesData = [
        { name: ROLE.ADMIN },
        { name: ROLE.USER },
        { name: ROLE.GUEST },
    ];

    const permissionsData = [
        { name: PERMISSION.CREATE },
        { name: PERMISSION.READ },
        { name: PERMISSION.UPDATE },
        { name: PERMISSION.DELETE },
    ];

    const roles = rolesData.map(role => ({
        updateOne: {
            filter: { name: role.name },
            update: { $setOnInsert: role },
            upsert: true,
        }
    }));

    const permissions = permissionsData.map(permission => ({
        updateOne: {
            filter: { name: permission.name },
            update: { $setOnInsert: permission },
            upsert: true,
        }
    }));

    await Role.bulkWrite(roles);
    await Permission.bulkWrite(permissions);
};