import {Middleware} from "./internal_scripts/Middlewares";
const home = require("./controllers/mainController");

const express = require("express");
const helmet = require("helmet");
const app = express();

app.set('views', require("path").resolve(__dirname,"views") );
app.set('view engine', 'ejs');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.instagram.com", "https://code.jquery.com", "https://www.google.com", "https://www.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "https://www.google-analytics.com", "https://www.googletagmanager.com", "https://region1.google-analytics.com", "https://www.google.com"],
      frameSrc: ["https://www.instagram.com", "https://www.youtube-nocookie.com"],
    },
  },
  permissionsPolicy: false,
}));

app.use(express.json());                                    // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));    // to support URL-encoded bodies
app.use('/assets', express.static(__dirname + "/assets", { maxAge: '1y' }));    // makes assets folder directly accessible

// Compute CSS versions and load critical CSS for inlining
// Critical CSS is inlined for faster initial render; non-critical loads async
const fs = require("fs");
const path = require("path");

try {
    // Critical CSS version and content
    const criticalPath = path.resolve(__dirname, "assets/css/style.critical.min.css");
    const criticalStat = fs.statSync(criticalPath);
    app.locals.cssVersionCritical = criticalStat.mtimeMs.toString(36);
    app.locals.criticalCss = fs.readFileSync(criticalPath, 'utf8');

    // Non-critical CSS version
    const nonCriticalPath = path.resolve(__dirname, "assets/css/style.non-critical.min.css");
    const nonCriticalStat = fs.statSync(nonCriticalPath);
    app.locals.cssVersionNonCritical = nonCriticalStat.mtimeMs.toString(36);
} catch {
    app.locals.cssVersionCritical = Date.now().toString(36);
    app.locals.cssVersionNonCritical = Date.now().toString(36);
    app.locals.criticalCss = "/* CSS failed to load */";
}

app.use(Middleware.Compression);
app.use(Middleware.FormUploadHandler);

app.use("/", home);

app.use(Middleware.CheckForImageRequest({
    listenIn: ["/assets"],
    autoSave: true
}));

app.use(Middleware.NotFoundHandler);
app.use(Middleware.InternalErrorHandler);

const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => {
    console.log("Ready");
});

module.exports = server;