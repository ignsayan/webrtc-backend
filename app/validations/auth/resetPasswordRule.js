const resetPasswordRule = (req) => ({
    data: req.body,
    rules: {
        token: ['required'],
        password: ['required', 'min:8', 'confirmed'],
        password_confirmation: ['required', 'min:8', 'same:password'],
    },
});

export default resetPasswordRule;