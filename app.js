"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middlewares_1 = require("./internal_scripts/Middlewares");
const home = require("./controllers/mainController");
const express = require("express");
const helmet = require("helmet");
const app = express();
app.set('views', require("path").resolve(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
            connectSrc: ["'self'", "https://www.google-analytics.com", "https://www.googletagmanager.com"],
        },
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(__dirname + "/assets", { maxAge: '1y' }));
const fs = require("fs");
const path = require("path");
try {
    const criticalPath = path.resolve(__dirname, "assets/css/style.critical.min.css");
    const criticalStat = fs.statSync(criticalPath);
    app.locals.cssVersionCritical = criticalStat.mtimeMs.toString(36);
    app.locals.criticalCss = fs.readFileSync(criticalPath, 'utf8');
    const nonCriticalPath = path.resolve(__dirname, "assets/css/style.non-critical.min.css");
    const nonCriticalStat = fs.statSync(nonCriticalPath);
    app.locals.cssVersionNonCritical = nonCriticalStat.mtimeMs.toString(36);
}
catch {
    app.locals.cssVersionCritical = Date.now().toString(36);
    app.locals.cssVersionNonCritical = Date.now().toString(36);
    app.locals.criticalCss = "/* CSS failed to load */";
}
app.use(Middlewares_1.Middleware.Compression);
app.use(Middlewares_1.Middleware.FormUploadHandler);
app.use("/", home);
app.use(Middlewares_1.Middleware.CheckForImageRequest({
    listenIn: ["/assets"],
    autoSave: true
}));
app.use(Middlewares_1.Middleware.NotFoundHandler);
app.use(Middlewares_1.Middleware.InternalErrorHandler);
const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => {
    console.log("Ready");
});
module.exports = server;
//# sourceMappingURL=app.js.map