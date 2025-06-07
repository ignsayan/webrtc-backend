import createAndStoreOtp from '../../services/createAndStoreOtp.js'
import transporter from '../../../configs/nodemailer.js'
import template from '../../../emails/verificationEmail.js'

const emailVerification = (schema) => {

    schema.methods.sendEmailVerification = async function () {
        const otp = await createAndStoreOtp(this, 'email');
        if (otp) {
            const data = {
                name: this.first_name,
                code: otp.code.toString(),
                time: otp.expiry
            }
            await transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: this.email,
                subject: 'Email Verification',
                html: template(data),
            });
        }
    };

    schema.methods.hasVerifiedEmail = function () {
        return !!this.email_verified_at;
    };

    schema.methods.markEmailAsVerified = async function () {
        this.email_verified_at = new Date();
        await this.save();
    };
};

export default emailVerification
