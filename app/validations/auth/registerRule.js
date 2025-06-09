import parsePhoneNumberFromString from 'libphonenumber-js';
import User from '../../models/User.js';

const registerRule = (req) => ({

    data: req.body,
    rules: {
        first_name: ['required', 'string'],
        last_name: ['required', 'string'],
        email: ['required', 'email', 'unique_email'],
        phone: ['nullable', 'numeric', 'valid_phone', 'unique_phone'],
        password: ['required', 'min:8', 'confirmed'],
    },
    messages: {
        'first_name.required': 'First name is required.',
        'last_name.required': 'Last name is required.',
    },
    customValidators: {
        unique_email: async (email, attribute, req, passes) => {
            const user = await User.findOne({ email });
            if (user) return passes(false, 'Email already exists');
            return passes();
        },
        valid_phone: async (phone, attribute, req, passes) => {
            const number = parsePhoneNumberFromString(phone);
            if (!number || !number.isValid()) return passes(false, 'Invalid phone number');
            return passes();
        },
        unique_phone: async (phone, attribute, req, passes) => {
            if (!phone) return passes();
            const user = await User.findOne({ phone });
            if (user) return passes(false, 'Phone already exists');
            return passes();
        },
    }
});

export default registerRule;