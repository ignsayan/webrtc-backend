const verifyOtpRule = (req) => ({
    data: req.body,
    rules: {
        code: ['required', 'numeric'],
        channel: ['required', 'in:email,phone'],
    },
});

export default verifyOtpRule;