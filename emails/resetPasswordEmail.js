export default function template(data) {

    let { name, link, time } = data;
    
    time = Math.ceil((time - Date.now()) / 1000 / 60);

    return (
        `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
            <h2 style="color: #222;">Hey, ${name}</h2>

            <p style="font-size: 16px; color: #444; line-height: 1.5;">
                You have recently requested to reset your password.
            </p>

            <p style="font-size: 16px; color: #444; line-height: 1.5;">
                Click the button below to proceed.
            </p>

            <div style="text-align: center;">
                <a href="${link}" style="display: inline-block; padding: 12px 20px; margin: 20px 0; background-color: rgb(50, 50, 50); color: #fff; text-decoration: none; border-radius: 30px;">
                Reset Password
                </a>
            </div>

            <p style="font-size: 14px; color: #777;">
                This link will expire in <strong>${time} minutes</strong>.
            </p>
            
            <p style="font-size: 14px; color: #999;">
                If you didn’t request this, you can safely ignore this email.
            </p>
        </div>`
    );
}