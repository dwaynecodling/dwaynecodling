import {Middleware} from "./internal_scripts/Middlewares";
import * as home from "./controllers/mainController";

const express = require("express");
const app = express();

app.set('views', require("path").resolve(__dirname,"views") );
app.set('view engine', 'ejs');

app.use(express.json());                                    // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));    // to support URL-encoded bodies
app.use('/assets', express.static(__dirname + "/assets"));    // makes assets folder directly accessible

app.use(Middleware.Compression);
app.use(Middleware.FormUploadHandler);

app.use("/", home);

app.use(Middleware.NotFoundHandler);
app.use(Middleware.InternalErrorHandler);

let server = app.listen(3000, () => {
    console.log("Ready");
});

module.exports = server;