import {Middleware} from "./internal_scripts/Middlewares";
const home = require("./controllers/mainController");

const express = require("express");
const helmet = require("helmet");
const app = express();

app.set('views', require("path").resolve(__dirname,"views") );
app.set('view engine', 'ejs');

app.use(helmet());

app.use(express.json());                                    // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));    // to support URL-encoded bodies
app.use('/assets', express.static(__dirname + "/assets", { maxAge: '1y' }));    // makes assets folder directly accessible

// Compute CSS version once at startup — stable URL browsers can cache,
// only changes when the CSS file is actually rebuilt.
try {
    const stat = require("fs").statSync(require("path").resolve(__dirname, "assets/css/style.min.css"));
    app.locals.cssVersion = stat.mtimeMs.toString(36);
} catch {
    app.locals.cssVersion = Date.now().toString(36);
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