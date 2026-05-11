"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Middlewares_1 = require("./internal_scripts/Middlewares");
const home = __importStar(require("./controllers/mainController"));
const express = require("express");
const helmet = require("helmet");
const app = express();
app.set('views', require("path").resolve(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(__dirname + "/assets"));
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