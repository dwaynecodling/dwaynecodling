

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
        const transporter = nodemailer.createTransport({sendmail: true}, {
            from: options.from.name ? `"${options.from.name}" <${options.from.email}>` : options.from.email,
            to: options.to.name ? `"${options.to.name}" <${options.to.email}>` : options.to.email,
            subject: options.subject
        });

        return await transporter.sendMail(options.body);
    }

}