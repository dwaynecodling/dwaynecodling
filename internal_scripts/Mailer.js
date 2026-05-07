"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
var Mailer;
(function (Mailer) {
    async function sendMail(options) {
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
    Mailer.sendMail = sendMail;
})(Mailer = exports.Mailer || (exports.Mailer = {}));
//# sourceMappingURL=Mailer.js.map