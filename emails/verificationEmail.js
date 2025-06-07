export default function template(data) {

    let { name, code, time } = data;

    time = Math.ceil((time - Date.now()) / 1000 / 60);

    return (
        `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
            <h2 style="color: #222;">Hey, ${name}</h2>

            <p style="font-size: 16px; color: #444; line-height: 1.5;">
                Please use the code below to verify your email address.
            </p>

            <div style="margin: 20px 0; padding: 20px; text-align: center; border: 2px solid #333; border-radius: 12px; background: rgba(0, 0, 0, 0.05);">
                <span style="font-size: 32px; font-weight: 600; color: #222; letter-spacing: 4px;">
                ${code}
                </span>
            </div>
            
            <p style="font-size: 14px; color: #777;">
                This code will expire in <strong>${time} minutes</strong>.
            </p>
            
            <p style="font-size: 14px; color: #999;">
                If you didn’t request this, you can safely ignore this email.
            </p>
        </div>`
    );
}