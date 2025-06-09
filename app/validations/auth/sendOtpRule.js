import parsePhoneNumberFromString from 'libphonenumber-js';

const sendOtpRule = (req) => ({
    data: req.body,
    rules: {
        attribute: ['required', 'email_or_phone'],
    },
    customValidators: {
        email_or_phone: function (value, attribute, req, passes) {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const number = parsePhoneNumberFromString(value);
            const isPhone = number && number.isValid();

            if (!isEmail && !isPhone) {
                return passes(false, 'Must be a valid email or phone number format');
            }
            req.body.channel = isEmail ? 'email' : 'phone';
            return passes();
        }
    }
});

export default sendOtpRule;