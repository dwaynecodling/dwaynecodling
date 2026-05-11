"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middlewares_1 = require("./internal_scripts/Middlewares");
const home = require("./controllers/mainController");
const express = require("express");
const helmet = require("helmet");
const app = express();
app.set('views', require("path").resolve(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(__dirname + "/assets"));
try {
    const stat = require("fs").statSync(require("path").resolve(__dirname, "assets/css/style.min.css"));
    app.locals.cssVersion = stat.mtimeMs.toString(36);
}
catch {
    app.locals.cssVersion = Date.now().toString(36);
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