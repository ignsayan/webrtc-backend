import createAndStoreOtp from '../../services/createAndStoreOtp.js'
import twilioclient from '../../../configs/twilio.js'

const phoneVerification = (schema) => {

    schema.methods.sendPhoneVerification = async function () {
        const otp = await createAndStoreOtp(this, 'phone');
        if (otp) {
            const number = this.phone;
            const body = `Your verification code is ${otp.code}`;
            await twilioclient.send({ number, body });
        }
    };

    schema.methods.hasVerifiedPhone = function () {
        return !!this.phone_verified_at;
    };

    schema.methods.markPhoneAsVerified = async function () {
        this.phone_verified_at = new Date();
        await this.save();
    };
};

export default phoneVerification
