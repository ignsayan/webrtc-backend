const userRule = (req) => ({

    data: req.body,
    rules: {
        email: ['required', 'email'],
        username: ['nullable', 'regex:/^[a-zA-Z0-9]+$/'],
        password: ['required'],
        general: ['email_or_username_exclusive'],
    },
    messages: {
        'email.email': 'Invalid email format',
        'username.regex': 'Username can only be alphanumeric',
        'password.required': 'Password is required',
        'general.email_or_username_exclusive': 'Provide either email or username, not both',
        'general.required': 'Email or username is required',
    },
    customValidators: {
        email_or_username_exclusive: async (_value, _attribute, req, passes) => {
            const { email, username } = req.body;
            if (!email && !username) {
                return passes(false, 'Email or username is required');
            }
            if (email && username) {
                return passes(false, 'Email and username cannot be present at the same time');
            }
            return passes();
        }
    }
});

export default userRule;