import slugify from 'slugify';

// Constants for roles & permissions
const roles = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
};
const permissions = {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
};

export const ROLE = Object.fromEntries(
    Object.entries(roles).map(([key, value]) => [
        key, slugify(value, { lower: true })
    ])
);
export const PERMISSION = Object.fromEntries(
    Object.entries(permissions).map(([key, value]) => [
        key, slugify(value, { lower: true })
    ])
);

// Constants for media
const media = {
    type: {
        GENERAL: 'general',
        BANNER: 'banner',
        USER_UPLOADS: 'user_uploads',
    },
};
export const MEDIA = {
    TYPE: Object.fromEntries(
        Object.entries(media.type).map(([key, value]) => [
            key, slugify(value, { lower: true })
        ])
    ),
};

// Constants for otp
export const OTP = {
    CHANNEL: {
        EMAIL: 'email',
        PHONE: 'phone',
    },
    EXPIRY: 10 * 60 * 1000,
};

// Constants for provider
export const PROVIDER = {
    LOCAL: 'local',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    GITHUB: 'github',
};