"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mailer;
(function (Mailer) {
    const nodemailer = require('nodemailer');
    async function sendMail(options) {
        const transporter = nodemailer.createTransport({ sendmail: true }, {
            from: options.from.name ? `"${options.from.name}" <${options.from.email}>` : options.from.email,
            to: options.to.name ? `"${options.to.name}" <${options.to.email}>` : options.to.email,
            subject: options.subject
        });
        return await transporter.sendMail(options.body);
    }
    Mailer.sendMail = sendMail;
})(Mailer = exports.Mailer || (exports.Mailer = {}));
//# sourceMappingURL=Mailer.js.map