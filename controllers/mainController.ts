import {PostRepository} from "../repository/PostRepository";
import {JSONResponse} from "../internal_scripts/JSONResponse";
import {isEmailFormatValid} from "../internal_scripts/convinienceHelper";
import {Mailer} from "../internal_scripts/Mailer";
const home = require('express').Router();
home.get("/", async function (req, res) {
    let otherArticles = await PostRepository.getRecentPosts(3);
    res.render("pages/homepage",{otherArticles});
});
home.get("/contact-me", async function (req, res) {
    let otherArticles = await PostRepository.getRecentPosts(3);
    res.render("pages/contact_me", {otherArticles});
});
home.get("/about-me", async function (req, res) {
    res.render("pages/about_me");
});
home.get("/posts", async function(req, res){
    let posts = await PostRepository.getAllPosts(true);
    res.render("pages/all_posts",{ posts });
});
home.get("/post/:slug", async function (req, res) {
    let slug = req.params['slug'];
    let article = await PostRepository.getBySlug(slug);
    if (!article) return res.status(404).render("pages/not_found", { title: `404: Post Not Found` });
    let otherArticles = (await PostRepository.getAllFilteredPosts(p => p.data.slug !== slug, true)).slice(0, 3);
    res.render("pages/single_post", {
        currentArticle: article,
        otherArticles: otherArticles
    });
});
// handles incoming contact form submission
home.post("/form/contact", async function (req, res) {
    let superAgent = require("superagent");
    let {token, name, action, message, email} = req.body;
    // check email is formatted well
    if (!isEmailFormatValid(email)){
        res.json(JSONResponse(
            false,
            "Email address invalid",
            `The email address you entered (${email}) is not valid`,
            { email }
        ));
        return;
    }
    // check name and message isn't empty
    if (name.trim() === "" || message.trim() === ""){
        res.json(JSONResponse(
            false,
            "Name and Message must not be empty",
            `Please make sure the "name" and "message" boxes are filled in`,
            { name, message }
        ));
        return;
    }
    // verify captcha result with google
    superAgent.post("https://www.google.com/recaptcha/api/siteverify").type("form").send({
        secret: process.env.RECAPTCHA_SECRET,
        response: token
    }).end(async (err, resp) => {
        let response = resp.body;
        // Check reCaptcha response
        if(response["success"] === true && response["action"] === action && response["score"] >= 0.5) {
            const he = require("he");
            try {
                await Mailer.sendMail({
                    to: { name: "Dwayne Codling", email: "dwayneandrecodling@gmail.com" },
                    from: { name: name, email: email },
                    subject: `Message from ${name}`,
                    body: {
                        html: `
                            <strong>Date: ${ (new Date()).toUTCString() }</strong> <br/>
                            <strong>Name: ${name}</strong><br/>
                            <strong>Email: ${email}</strong><br/>
                            <strong>Message:</strong><br/>
                            <pre>${ he.encode(message) }</pre>`,
                        text: `
                        Date: ${ (new Date()).toUTCString() } \n
                        Name: ${name} \n
                        Email: ${email} \n
                        Message: \n
                        ${he.encode(message)}`
                    }
                });
                res.json(JSONResponse(true, "Message Sent", "Message has been sent"));
            } catch(e) {
                console.error("Mail send failed:", e);
                res.json(JSONResponse(false, "Failed", "Message not sent (mail error)"));
            }
        } else {
            console.error("reCAPTCHA failed:", response);
            res.json(JSONResponse(false, "Failed", "Message not sent (reCaptcha fail)"));
        }
    });
});
module.exports = home;