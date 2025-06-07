import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const sid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.TWILIO_FROM_NUMBER;

const client = new twilio(sid, authToken);

const send = async ({ number, body }) => {
    await client.messages.create({
        body,
        from: phone,
        to: number,
    });
}

export default { send };