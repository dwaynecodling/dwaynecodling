"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostRepository_1 = require("../repository/PostRepository");
const JSONResponse_1 = require("../internal_scripts/JSONResponse");
const convinienceHelper_1 = require("../internal_scripts/convinienceHelper");
const Mailer_1 = require("../internal_scripts/Mailer");
const home = require('express').Router();
home.get("/", async function (req, res) {
    let otherArticles = await PostRepository_1.PostRepository.getRecentPosts(3);
    res.render("pages/homepage", { otherArticles });
});
home.get("/contact-me", async function (req, res) {
    let otherArticles = await PostRepository_1.PostRepository.getRecentPosts(3);
    res.render("pages/contact_me", { otherArticles });
});
home.get("/about-me", async function (req, res) {
    res.render("pages/about_me");
});
home.get("/posts", async function (req, res) {
    let posts = await PostRepository_1.PostRepository.getAllPosts(true);
    res.render("pages/all_posts", { posts: posts.slice(0, 20) });
});
home.get("/post/:slug", async function (req, res) {
    let slug = req.params['slug'];
    let otherArticles = await PostRepository_1.PostRepository.getRecentPosts(3);
    let article = await PostRepository_1.PostRepository.getBySlug(slug);
    res.render("pages/single_post", {
        currentArticle: article,
        otherArticles: otherArticles
    });
});
home.post("/form/contact", async function (req, res) {
    let superAgent = require("superagent");
    let { token, name, action, message, email } = req.body;
    if (!convinienceHelper_1.isEmailFormatValid(email)) {
        res.json(JSONResponse_1.JSONResponse(false, "Email address invalid", `The email address you entered (${email}) is not valid`, { email }));
        return;
    }
    if (name.trim() === "" || message.trim() === "") {
        res.json(JSONResponse_1.JSONResponse(false, "Name and Message must not be empty", `Please make sure the "name" and "message" boxes are filled in`, { name, message }));
        return;
    }
    superAgent.post("https://www.google.com/recaptcha/api/siteverify").type("form").send({
        secret: "6Lf5DgEVAAAAABvIlQM1XngklKvnoclH76bgNhS5",
        response: token
    }).end(async (err, resp) => {
        let response = resp.body;
        if (response["success"] === true && response["action"] === action && response["score"] >= 0.5) {
            const he = require("he");
            let r = await Mailer_1.Mailer.sendMail({
                to: { name: "Dwayne Codling", email: "hello@dwaynecodling.com" },
                from: { name: name, email: email },
                subject: `Message from ${name}`,
                body: {
                    html: `
                        <strong>Date: ${(new Date()).toUTCString()}</strong> <br/>
                        <strong>Name: ${name}</strong><br/>
                        <strong>Message:</strong><br/>
                        <pre>${he.encode(message)}</pre>`,
                    text: `
                    Date: ${(new Date()).toUTCString()} \n
                    Name: ${name} \n
                    Message: \n
                    ${he.encode(message)}`
                }
            });
            res.json(JSONResponse_1.JSONResponse(true, "Message Sent", "Message has been sent"));
        }
        else {
            res.json(JSONResponse_1.JSONResponse(false, "Failed", "Message not sent (reCaptcha fail)"));
        }
    });
});
module.exports = home;
//# sourceMappingURL=mainController.js.map