import nodemailer from "nodemailer";

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendEmail({ to, subject, html }: EmailOptions) {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html,
        });
        console.log('이메일 전송 성공', to, subject);
    } catch (error) {
        console.error('이메일 전송 오류:', error);
        throw error;
    }
}
