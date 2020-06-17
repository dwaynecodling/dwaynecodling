"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
var Middleware;
(function (Middleware) {
    const path = require("path");
    const fs = require("fs");
    function NotFoundHandler(req, res) {
        res.status(404);
        res.render('pages/not_found', { title: `404: File Not Found (${req.url})` });
    }
    Middleware.NotFoundHandler = NotFoundHandler;
    function InternalErrorHandler(error, req, res, next) {
        res.status(500);
        res.render('pages/internal_error', { title: '500: Internal Server error', error: error });
    }
    Middleware.InternalErrorHandler = InternalErrorHandler;
    function Compression(req, res, next) {
        const compression = require('compression');
        return compression({
            filter: (req, res) => {
                let p = req.url;
                if (p.indexOf("?") > -1)
                    p = p.split("?")[0];
                if (req.headers['x-no-compression'] || p.endsWith(".js") === false) {
                    return false;
                }
                return compression.filter(req, res);
            }
        })(req, res, next);
    }
    Middleware.Compression = Compression;
    function FormUploadHandler(req, res, next) {
        let multer = require("multer");
        let accept = multer({
            preservePath: true,
            limits: {
                fileSize: 10000000
            },
            storage: multer.diskStorage({
                destination: path.resolve(__dirname, "../assets/uploads"),
                filename: function (req, file, cb) {
                    cb(null, `${Date.now()}-${file.originalname}`);
                }
            })
        }).any();
        accept(req, res, function () {
            next();
        });
    }
    Middleware.FormUploadHandler = FormUploadHandler;
    function CheckForImageRequest(options) {
        let normalizePath = (urlPath) => {
            var _a, _b, _c, _d;
            urlPath = urlPath.split("?")[0];
            if (urlPath.endsWith(".svg"))
                return null;
            let r = /@(?:(?<width>[0-9]+)x(?<height>[0-9]+)|(?<s_width>[0-9]+)w|(?<s_height>[0-9]+)h)/gm;
            let m = r.exec(urlPath);
            let workingMime = {
                "jpeg": "image/jpeg",
                "jpg": "image/jpeg",
                "webp": "image/webp",
                "png": "image/png"
            };
            if (Object.keys(m.groups).length > 0) {
                let normalPath = urlPath.replace(r, '').replace(/(?:-\.)/gm, '.');
                let ext = urlPath.substr(urlPath.lastIndexOf(".") + 1);
                let result = {
                    url: normalPath,
                    width: (_b = (_a = m.groups['width']) !== null && _a !== void 0 ? _a : m.groups['s_width']) !== null && _b !== void 0 ? _b : null,
                    height: (_d = (_c = m.groups['height']) !== null && _c !== void 0 ? _c : m.groups['s_height']) !== null && _d !== void 0 ? _d : null,
                    type: workingMime[ext]
                };
                if (result.width)
                    result.width = Number(result.width);
                if (result.height)
                    result.height = Number(result.height);
                return result;
            }
            return null;
        };
        const sharp = require('sharp');
        return async (req, res, next) => {
            let matchedUrl = options.listenIn.filter(d => req.url.startsWith(d));
            if (matchedUrl.length > -1) {
                console.log("returning resized image");
                let urlParts = normalizePath(req.url);
                let realFilePath = path.join(__dirname, ".." + urlParts.url);
                let exists = fs.existsSync(realFilePath);
                if (urlParts && exists) {
                    let instance = sharp(fs.readFileSync(realFilePath)).resize({
                        width: urlParts.width,
                        height: urlParts.height
                    });
                    instance.toBuffer()
                        .then((data) => {
                        res.write(data);
                        res.end();
                        instance.toFile(path.join(__dirname, ".." + req.url));
                    })
                        .catch(err => {
                        console.log(err);
                        next();
                    });
                    return;
                }
            }
            next();
        };
    }
    Middleware.CheckForImageRequest = CheckForImageRequest;
})(Middleware = exports.Middleware || (exports.Middleware = {}));
//# sourceMappingURL=Middlewares.js.map