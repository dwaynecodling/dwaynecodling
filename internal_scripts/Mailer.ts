

export namespace Mailer{

    const nodemailer = require('nodemailer');

    export interface IMailDefinition{
        to: {
            name?: string;
            email: string;
        };
        from: {
            name?: string;
            email: string;
        };
        subject: string;
        body: {
            html?: string;
            text?: string;
        };
    }

    export async function sendMail(options:IMailDefinition){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        return await transporter.sendMail({
            from: options.from.name ? `"${options.from.name}" <${process.env.MAIL_USER}>` : process.env.MAIL_USER,
            to: options.to.name ? `"${options.to.name}" <${options.to.email}>` : options.to.email,
            replyTo: options.from.name ? `"${options.from.name}" <${options.from.email}>` : options.from.email,
            subject: options.subject,
            ...options.body
        });
    }

}