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
home.get("/robots.txt", function(req, res){
    res.header("Content-Type", "text/plain");
    res.send("User-agent: *\nAllow: /\nSitemap: https://dwaynecodling.com/sitemap.xml");
});
home.get("/sitemap.xml", async function(req, res){
    let posts = await PostRepository.getAllPosts(true);
    const base = "https://dwaynecodling.com";
    const today = new Date().toISOString().split('T')[0];
    function toISODate(dateStr: string): string {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return today;
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }
    const staticPages = [
        { url: "/", priority: "1.0", lastmod: "2025-01-01" },
        { url: "/about-me", priority: "0.8", lastmod: "2025-01-01" },
        { url: "/posts", priority: "0.9", lastmod: today },
        { url: "/contact-me", priority: "0.7", lastmod: "2025-01-01" }
    ];
    const urls = [
        ...staticPages.map(p => `  <url><loc>${base}${p.url}</loc><lastmod>${p.lastmod}</lastmod><priority>${p.priority}</priority></url>`),
        ...posts.map(p => `  <url><loc>${base}/post/${p.data.slug}</loc><lastmod>${toISODate(p.data.date)}</lastmod><priority>0.8</priority></url>`)
    ].join('\n');
    res.header("Content-Type", "application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
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