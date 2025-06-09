import User from '../models/User.js';

const hasRole = (...allowedRoles) => {
    
    return async (req, res, next) => {

        try {
            const id = req.user.id;
            const user = await User.findById(id).populate('roles');
            const givenRoles = user.roles.map(role => role.name);

            const access = allowedRoles.some(role => givenRoles.includes(role));
            if (!access) {
                return res.status(403).json({ error: 'You do not have the required roles' });
            }
            return next();

        } catch (error) {
            const message = error.message || new Error('Role verification failed');
            res.status(500).json({ error: message });
        }
    };
};

export default hasRole;
