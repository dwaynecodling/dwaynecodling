
export namespace Middleware{

    const path = require("path");
    const fs = require("fs");

    /**
     * Handles not found (404)
     */
    export function NotFoundHandler(req , res) {
        res.status(404);
        res.render('pages/not_found', {title: `404: File Not Found (${req.url})`});
    }

    /**
     * Handles internal server errors (generic 500)
     */
    export function InternalErrorHandler(error, req, res, next) {
        res.status(500);
        res.render('pages/internal_error', {title: '500: Internal Server error', error: error});
    }

    /**
     * Handles compression
     */
    export function Compression(req, res, next){
        const compression = require('compression');
        return compression({
            filter: (req, res)=> {
                let p = req.url;

                if (p.indexOf("?") > -1) p = p.split("?")[0];

                if (req.headers['x-no-compression'] || p.endsWith(".js") === false) {
                    // don't compress responses with this request header
                    // don't compress files that are not js
                    return false
                }

                // fallback to standard filter function
                return compression.filter(req, res)
            }
        })(req, res, next);
    }

    export function FormUploadHandler(req, res, next){
        let multer = require("multer");
        let accept = multer({
            preservePath: true,
            limits: {
                fileSize: 10_000_000
            },
            storage : multer.diskStorage({
                destination: path.resolve(__dirname, "../assets/uploads"),
                filename: function (req, file, cb) {
                    cb(null, `${Date.now()}-${file.originalname}`);
                }
            })
        }).any();
        accept(req, res, function(){
            // req.files will contain the files that have been uploaded, in the following format
            // file {
            //   originalname : string;
            //   encoding : string;
            //   mimetype : string;
            //   size : string; // in bytes
            //   path : string; // destination path
            //   buffer : Buffer;
            // }
            next();
        });
    }


    export function CheckForImageRequest(options:{listenIn:Array<string>, autoSave?:boolean}){
        let normalizePath = (urlPath:string) => {
            urlPath = urlPath.split("?")[0];
            if (urlPath.endsWith(".svg")) return null;
            let r = /@(?:(?<width>[0-9]+)x(?<height>[0-9]+)|(?<s_width>[0-9]+)w|(?<s_height>[0-9]+)h|(?<scale>[0-9]+x))/gm;
            let m = r.exec(urlPath);
            let workingMime = {
                "jpeg" : "image/jpeg",
                "jpg" : "image/jpeg",
                "webp" : "image/webp",
                "png" : "image/png"
            }

            if (m && Object.keys(m.groups).length > 0){
                let normalPath = urlPath.replace(r,'').replace(/(?:-\.)/gm,'.');
                let ext = urlPath.substr(urlPath.lastIndexOf(".") + 1);

                let result:{[n:string]:any} = {
                    url: normalPath,
                    width: m.groups['width'] ?? m.groups['s_width'] ?? null,
                    height: m.groups['height'] ?? m.groups['s_height'] ?? null,
                    scale: m.groups['scale'] ?? "2x",
                    type: workingMime[ext]
                };

                if (result.width) result.width = Number(result.width);
                if (result.height) result.height = Number(result.height);

                return result;
            }
            return null;
        }
        const sharp = require('sharp');

        return async (req, res, next) => {
            let matchedUrl = options.listenIn.filter(d => req.url.startsWith(d));
            if (matchedUrl.length > -1) {
                console.log("returning resized image");
                let urlParts = normalizePath(req.url);
                if (urlParts){
                    let realFilePath = path.join(__dirname, ".." + urlParts.url);
                    let exists = fs.existsSync(realFilePath);

                    if (!exists) return next();

                    let instance = sharp(fs.readFileSync(realFilePath)) .resize({
                        width: urlParts.width,
                        height: urlParts.height
                    });

                    instance.toBuffer()
                        .then( (data:Buffer) => {
                            res.write(data);
                            res.end();

                            if (options.autoSave){
                                instance.toFile(path.join(__dirname, ".." + req.url));
                            }
                        })
                        .catch( err => {
                            console.log(err);
                            next();
                        });
                    return;
                }
            }
            next();
        };
    }
}