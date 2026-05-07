

export namespace Mailer{

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
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        return await resend.emails.send({
            from: options.from.name
                ? `${options.from.name} <onboarding@resend.dev>`
                : 'onboarding@resend.dev',
            to: options.to.email,
            reply_to: options.from.email,
            subject: options.subject,
            html: options.body.html,
            text: options.body.text
        });
    }

}
