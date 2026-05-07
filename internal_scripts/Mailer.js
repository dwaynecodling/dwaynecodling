"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
var Mailer;
(function (Mailer) {
    const nodemailer = require('nodemailer');
    async function sendMail(options) {
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
    Mailer.sendMail = sendMail;
})(Mailer = exports.Mailer || (exports.Mailer = {}));
//# sourceMappingURL=Mailer.js.map