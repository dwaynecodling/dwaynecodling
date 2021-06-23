
// contct endpoint

export default (req, res)=>{
	/*
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
        secret: "6Lf5DgEVAAAAABvIlQM1XngklKvnoclH76bgNhS5", //TODO change this!!
        response: token
    }).end(async (err, resp) => {
        let response = resp.body;
        // Check reCaptcha response
        if(response["success"] === true && response["action"] === action && response["score"] >= 0.5) {
            const he = require("he");
            // send the email
            let r = await Mailer.sendMail({
                to: { name: "Dwayne Codling", email: "hello@dwaynecodling.com" },
                from: { name: name, email: email },
                subject: `Message from ${name}`,
                body: {
                    html: `
                        <strong>Date: ${ (new Date()).toUTCString() }</strong> <br/>
                        <strong>Name: ${name}</strong><br/>
                        <strong>Message:</strong><br/>
                        <pre>${ he.encode(message) }</pre>`,
                    text: `
                    Date: ${ (new Date()).toUTCString() } \n
                    Name: ${name} \n
                    Message: \n
                    ${he.encode(message)}`
                }
            });
            res.json(JSONResponse(
                true,
                "Message Sent",
                "Message has been sent"
            ));
        } else {
            // Possible spam, ignore email;
            res.json(JSONResponse(
                false,
                "Failed",
                "Message not sent (reCaptcha fail)"
            ));
        }
    });
	 */
}