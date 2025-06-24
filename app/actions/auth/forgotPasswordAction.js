import crypto from 'crypto';
import bcrypt from 'bcrypt';
import PasswordReset from '../../models/PasswordReset.js';
import template from '../../../emails/resetPasswordEmail.js';
import transporter from '../../../configs/nodemailer.js';

const action = async (data) => {

    const { email, user } = data;

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);

    const passwordReset = await PasswordReset.findOneAndUpdate(
        { user: user._id },
        {
            token: hashedToken,
            expiry: new Date(Date.now() + 10 * 60 * 1000)
        },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
    );

    if (!user && !passwordReset) {
        throw new Error('Something went wrong');
    }

    const raw = {
        name: user.first_name,
        link: `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`,
        time: passwordReset.expiry
    };

    // await transporter.sendMail({
    //     from: process.env.MAIL_FROM,
    //     to: email,
    //     subject: 'Password Reset',
    //     html: template(raw),
    // });
};

export default action;