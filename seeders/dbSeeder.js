import dbconnect from '../configs/database.js'
import rolePermissionSeeder from './rolePermissionSeeder.js'
import adminSeeder from './adminSeeder.js'

(async () => {

    await dbconnect();

    await rolePermissionSeeder();
    await adminSeeder();

    process.exit(0);

})()